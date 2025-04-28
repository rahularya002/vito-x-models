import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Override console methods to filter Supabase logs
const originalConsoleLog = console.log
const originalConsoleWarn = console.warn

console.log = (...args) => {
  // Only log if it's not a Supabase request log
  if (typeof args[0] === 'string' && !args[0].includes('XHR') && !args[0].includes('GET') && !args[0].includes('POST')) {
    originalConsoleLog(...args)
  }
}

console.warn = (...args) => {
  // Only log important warnings
  if (typeof args[0] === 'string' && !args[0].includes('Supabase')) {
    originalConsoleWarn(...args)
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-application-name': 'vito-x-models' }
  },
  db: {
    schema: 'public'
  }
})

export type Profile = {
  id: string
  full_name: string
  avatar_url: string
  company_name: string
  industry: string
  phone: string
  address: string
  city: string
  country: string
  bio: string
  notification_settings: {
    emailCampaigns: boolean
    emailProducts: boolean
    emailModels: boolean
    emailAnalytics: boolean
    pushCampaigns: boolean
    pushProducts: boolean
    pushModels: boolean
    pushAnalytics: boolean
  }
  privacy_settings: {
    profileVisibility: string
    dataSharing: boolean
    marketingEmails: boolean
  }
}

export type Campaign = {
  id: string
  user_id: string
  name: string
  description: string
  start_date: string
  end_date: string | null
  budget: number | null
  status: "draft" | "active" | "completed"
  created_at: string
  campaign_products?: {
    products: Product
  }[]
}

export type Model = {
  id: string
  name: string
  avatar_url: string
  gender: string
  age_range: string
  style: string
  height?: string
  experience?: string
  is_ai: boolean
  created_at: string
}

export type Product = {
  id: string
  user_id: string
  name: string
  collection: string
  category: string
  description: string
  target_audience: string
  status: string
  created_at: string
  product_images?: {
    url: string
  }[]
}

export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (error) {
      // Only log non-404 errors
      if (error.code !== "PGRST116") {
        console.error("Error fetching profile:", error)
      }
      return null
    }

    return data as Profile
  } catch (error) {
    // Only log unexpected errors
    if (!(error as any)?.code?.includes("PGRST")) {
      console.error("Unexpected error fetching profile:", error)
    }
    return null
  }
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId)

  if (error) {
    console.error("Error updating profile:", error)
    throw error
  }

  return data
}

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { error: uploadError } = await supabase.storage.from("user-content").upload(filePath, file)

  if (uploadError) {
    console.error("Error uploading avatar:", uploadError)
    throw uploadError
  }

  const { data } = supabase.storage.from("user-content").getPublicUrl(filePath)
  return data.publicUrl
}
