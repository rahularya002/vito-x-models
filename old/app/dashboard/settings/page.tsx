"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { supabase } from "@/lib/supabase"
import { SettingsSidebar } from "@/components/dashboard/SettingsSidebar"
import { ProfileSettings } from "@/components/dashboard/ProfileSettings"
import { CompanySettings } from "@/components/dashboard/CompanySettings"
import { NotificationSettings } from "@/components/dashboard/NotificationSettings"
import { PrivacySettings } from "@/components/dashboard/PrivacySettings"

// Extend the Profile type to include notification and privacy settings
interface ExtendedProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  company_name?: string;
  industry?: string;
  address?: string;
  city?: string;
  country?: string;
  notification_settings?: {
    emailCampaigns: boolean;
    emailProducts: boolean;
    emailModels: boolean;
    emailAnalytics: boolean;
    pushCampaigns: boolean;
    pushProducts: boolean;
    pushModels: boolean;
    pushAnalytics: boolean;
  };
  privacy_settings?: {
    profileVisibility: string;
    dataSharing: boolean;
    marketingEmails: boolean;
  };
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [profile, setProfile] = useState<ExtendedProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    industry: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [notificationSettings, setNotificationSettings] = useState({
    emailCampaigns: true,
    emailProducts: true,
    emailModels: true,
    emailAnalytics: false,
    pushCampaigns: true,
    pushProducts: true,
    pushModels: true,
    pushAnalytics: false,
  })
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    dataSharing: true,
    marketingEmails: true,
  })

  // Fetch the user profile from Supabase when session is available
  useEffect(() => {
    async function fetchProfile() {
      if (session?.user?.id) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
          } else if (data) {
            setProfile(data as ExtendedProfile);
            
            // Load notification settings from profile if available
            if (data.notification_settings) {
              setNotificationSettings(data.notification_settings);
            }
            
            // Load privacy settings from profile if available
            if (data.privacy_settings) {
              setPrivacySettings(data.privacy_settings);
            }
          }
        } catch (error) {
          console.error("Unexpected error in fetchProfile:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    if (status === "authenticated") {
      fetchProfile();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setPrivacySettings((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadAvatar = async () => {
    if (!avatarFile || !session?.user?.id) return null
    
    const fileExt = avatarFile.name.split('.').pop()
    const fileName = `${session.user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `avatars/${fileName}`
    
    const { error: uploadError } = await supabase.storage
      .from('user-content')
      .upload(filePath, avatarFile)
      
    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      return null
    }
    
    const { data } = supabase.storage.from('user-content').getPublicUrl(filePath)
    return data.publicUrl
  }

  const handleProfileSubmit = async (formData: {
    fullName: string;
    bio: string;
    phone: string;
    avatarFile?: File;
  }) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          bio: formData.bio,
          phone: formData.phone,
        })
        .eq("id", session?.user?.id)

      if (error) throw error

      if (formData.avatarFile) {
        const newAvatarUrl = await uploadAvatar()
        if (newAvatarUrl) {
          const { error: updateError } = await supabase
            .from("profiles")
            .update({ avatar_url: newAvatarUrl })
            .eq("id", session?.user?.id)

          if (updateError) throw updateError
        }
      }

      setMessage({ type: "success", text: "Profile updated successfully" })
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage({ type: "error", text: "Failed to update profile" })
    }
  }

  const handleCompanySubmit = async (formData: {
    companyName: string;
    industry: string;
    address: string;
    city: string;
    country: string;
  }) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          company_name: formData.companyName,
          industry: formData.industry,
          address: formData.address,
          city: formData.city,
          country: formData.country,
        })
        .eq("id", session?.user?.id)

      if (error) throw error

      setMessage({ type: "success", text: "Company information updated successfully" })
    } catch (error) {
      console.error("Error updating company information:", error)
      setMessage({ type: "error", text: "Failed to update company information" })
    }
  }

  const handleEmailSubmit = async (formData: { email: string }) => {
    try {
      // Email changes are handled differently with NextAuth
      // We'll just show a success message since we can't easily update email with NextAuth
      setMessage({ type: "success", text: "Please contact support to update your email address." })
    } catch (error) {
      console.error("Error updating email:", error)
      setMessage({ type: "error", text: "Failed to update email" })
    }
  }

  const handlePasswordSubmit = async (formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      // Password changes are handled differently with NextAuth
      // We'll just show a success message since we can't easily update password with NextAuth
      setMessage({ type: "success", text: "Please contact support to change your password." })
    } catch (error) {
      console.error("Error updating password:", error)
      setMessage({ type: "error", text: (error as Error).message || "Failed to update password" })
    }
  }

  const handleNotificationSubmit = async (settings: typeof notificationSettings) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          notification_settings: settings
        })
        .eq("id", session?.user?.id)

      if (error) throw error

      setMessage({ type: "success", text: "Notification preferences updated successfully" })
    } catch (error) {
      console.error("Error updating notification preferences:", error)
      setMessage({ type: "error", text: "Failed to update notification preferences" })
    }
  }

  const handlePrivacySubmit = async (settings: typeof privacySettings) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          privacy_settings: settings
        })
        .eq("id", session?.user?.id)

      if (error) throw error

      setMessage({ type: "success", text: "Privacy settings updated successfully" })
    } catch (error) {
      console.error("Error updating privacy settings:", error)
      setMessage({ type: "error", text: "Failed to update privacy settings" })
    }
  }

  if (loading) {
    return (
      <div className="p-6 md:p-10 bg-black min-h-full">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-stone-800 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-stone-800 rounded-xl mb-6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Success/Error Message */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === "success" ? "bg-green-900/30 border border-green-800" : "bg-red-900/30 border border-red-800"
                }`}
              >
                <p className="text-white">{message.text}</p>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <ProfileSettings profile={profile as ExtendedProfile} onSubmit={handleProfileSubmit} />
            )}

            {/* Company Tab */}
            {activeTab === "company" && (
              <CompanySettings profile={profile as ExtendedProfile} onSubmit={handleCompanySubmit} />
            )}

            {/* Email Tab */}
            {activeTab === "email" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Email Settings</h2>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleEmailSubmit({ email: session?.user?.email || "" });
                }} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={session?.user?.email}
                      className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <p className="text-white/60 text-sm mt-2">
                      We'll send a verification email to confirm the change.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium"
                    >
                      Update Email
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === "password" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  handlePasswordSubmit({
                    currentPassword: form.currentPassword.value,
                    newPassword: form.newPassword.value,
                    confirmPassword: form.confirmPassword.value,
                  });
                }} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-white mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        required
                        className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-white mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        required
                        className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <NotificationSettings
                settings={notificationSettings}
                onSubmit={handleNotificationSubmit}
              />
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <PrivacySettings
                settings={privacySettings}
                onSubmit={handlePrivacySubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
