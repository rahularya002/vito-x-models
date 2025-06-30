"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"

export async function createCampaign(formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const startDate = formData.get("startDate") as string
  const endDate = (formData.get("endDate") as string) || null
  const budget = formData.get("budget") ? Number.parseFloat(formData.get("budget") as string) : null
  const productIds = formData.getAll("productIds") as string[]

  // Insert campaign
  const { data: campaign, error } = await supabase
    .from("campaigns")
    .insert({
      user_id: session.user.id,
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      budget,
      status: "draft",
      created_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating campaign:", error)
    return { error: error.message }
  }

  // Add products to campaign
  if (productIds.length > 0) {
    const campaignProducts = productIds.map((productId) => ({
      campaign_id: campaign.id,
      product_id: productId,
      created_at: new Date().toISOString(),
    }))

    const { error: productsError } = await supabase.from("campaign_products").insert(campaignProducts)

    if (productsError) {
      console.error("Error adding products to campaign:", productsError)
    }
  }

  revalidatePath("/dashboard/campaigns")
  return { success: true, campaignId: campaign.id }
}

export async function getCampaigns() {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data, error } = await supabase
    .from("campaigns")
    .select(`
      *,
      campaign_products (
        products (
          id,
          name,
          category
        )
      )
    `)
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching campaigns:", error)
    return { error: error.message }
  }

  return { campaigns: data }
}

export async function getCampaign(id: string) {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data, error } = await supabase
    .from("campaigns")
    .select(`
      *,
      campaign_products (
        products (
          *,
          product_images (*)
        )
      ),
      analytics (*)
    `)
    .eq("id", id)
    .eq("user_id", session.user.id)
    .single()

  if (error) {
    console.error("Error fetching campaign:", error)
    return { error: error.message }
  }

  return { campaign: data }
}

export async function updateCampaignStatus(id: string, status: "draft" | "active" | "completed") {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { error } = await supabase.from("campaigns").update({ status }).eq("id", id).eq("user_id", session.user.id)

  if (error) {
    console.error("Error updating campaign status:", error)
    return { error: error.message }
  }

  revalidatePath(`/dashboard/campaigns/${id}`)
  revalidatePath("/dashboard/campaigns")
  return { success: true }
}

export async function deleteCampaign(id: string) {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { error } = await supabase.from("campaigns").delete().eq("id", id).eq("user_id", session.user.id)

  if (error) {
    console.error("Error deleting campaign:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/campaigns")
  return { success: true }
}
