"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { User, Building, Mail, Key, CreditCard, Bell, Shield, Upload, Check, X } from 'lucide-react'
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"

export default function SettingsPage() {
  const { user, profile, loading } = useAuth()
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

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || "",
        email: user?.email || "",
        companyName: profile.company_name || "",
        industry: profile.industry || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        country: profile.country || "",
        bio: profile.bio || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      
      // Load notification settings from profile if available
      if (profile.notification_settings) {
        setNotificationSettings(profile.notification_settings)
      }
      
      // Load privacy settings from profile if available
      if (profile.privacy_settings) {
        setPrivacySettings(profile.privacy_settings)
      }
    }
  }, [profile, user])

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
    if (!avatarFile || !user) return null
    
    const fileExt = avatarFile.name.split('.').pop()
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`
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

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      let avatarUrl = profile?.avatar_url
      
      // Upload new avatar if selected
      if (avatarFile) {
        const newAvatarUrl = await uploadAvatar()
        if (newAvatarUrl) {
          avatarUrl = newAvatarUrl
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          bio: formData.bio,
          phone: formData.phone,
          avatar_url: avatarUrl,
        })
        .eq("id", user?.id)

      if (error) {
        throw error
      }

      setMessage({ type: "success", text: "Profile updated successfully" })
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage({ type: "error", text: "Failed to update profile" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

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
        .eq("id", user?.id)

      if (error) {
        throw error
      }

      setMessage({ type: "success", text: "Company information updated successfully" })
    } catch (error) {
      console.error("Error updating company info:", error)
      setMessage({ type: "error", text: "Failed to update company information" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.updateUser({ email: formData.email })

      if (error) {
        throw error
      }

      setMessage({ 
        type: "success", 
        text: "Verification email sent. Please check your inbox to confirm the email change." 
      })
    } catch (error) {
      console.error("Error updating email:", error)
      setMessage({ type: "error", text: "Failed to update email" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" })
      setIsSubmitting(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: formData.newPassword })

      if (error) {
        throw error
      }

      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }))
      
      setMessage({ type: "success", text: "Password updated successfully" })
    } catch (error) {
      console.error("Error updating password:", error)
      setMessage({ type: "error", text: "Failed to update password" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          notification_settings: notificationSettings
        })
        .eq("id", user?.id)

      if (error) {
        throw error
      }

      setMessage({ type: "success", text: "Notification preferences updated successfully" })
    } catch (error) {
      console.error("Error updating notification settings:", error)
      setMessage({ type: "error", text: "Failed to update notification preferences" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrivacySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          privacy_settings: privacySettings
        })
        .eq("id", user?.id)

      if (error) {
        throw error
      }

      setMessage({ type: "success", text: "Privacy settings updated successfully" })
    } catch (error) {
      console.error("Error updating privacy settings:", error)
      setMessage({ type: "error", text: "Failed to update privacy settings" })
    } finally {
      setIsSubmitting(false)
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
            <div className="bg-stone-900 rounded-xl p-4 border border-white/10">
              <div className="flex flex-col space-y-1">
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "profile"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "company"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("company")}
                >
                  <Building className="h-5 w-5 mr-2" />
                  Company
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "email"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("email")}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Email
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "password"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("password")}
                >
                  <Key className="h-5 w-5 mr-2" />
                  Password
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "billing"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("billing")}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Billing
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "notifications"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "privacy"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("privacy")}
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy
                </button>
              </div>
            </div>
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
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden bg-stone-800">
                      <Image
                        src={avatarPreview || profile?.avatar_url || "/placeholder.svg?height=96&width=96"}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <label htmlFor="avatar-upload" className="cursor-pointer px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg inline-flex items-center">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                      </label>
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleAvatarChange}
                      />
                      <p className="text-white/60 text-sm mt-2">JPG, GIF or PNG. Max size 2MB.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-white mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-white mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Company Tab */}
            {activeTab === "company" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Company Information</h2>

                <form onSubmit={handleCompanySubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-white mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-white mb-1">
                        Industry
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="">Select Industry</option>
                        <option value="fashion">Fashion</option>
                        <option value="beauty">Beauty</option>
                        <option value="luxury">Luxury</option>
                        <option value="retail">Retail</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-white mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-white mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-white mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Email Tab */}
            {activeTab === "email" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Email Settings</h2>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <p className="text-white/60 text-sm mt-2">
                      We'll send a verification email to confirm the change.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
                    >
                      {isSubmitting ? "Updating..." : "Update Email"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === "password" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-white mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
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
                        value={formData.newPassword}
                        onChange={handleChange}
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
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.newPassword || formData.newPassword !== formData.confirmPassword}
                      className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
                    >
                      {isSubmitting ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Billing Information</h2>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Current Plan</h3>
                  <div className="bg-stone-800 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">Pro Plan</p>
                        <p className="text-white/60">$49.99/month</p>
                      </div>
                      <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-white/60 text-sm">Next billing date: May 15, 2023</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Payment Method</h3>
                  <div className="bg-stone-800 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-10 w-16 bg-stone-700 rounded mr-4"></div>
                        <div>
                          <p className="text-white font-medium">•••• •••• •••• 4242</p>
                          <p className="text-white/60 text-sm">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Billing History</h3>
                  <div className="bg-stone-800 rounded-lg overflow-hidden border border-white/10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Status</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-white/60">Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/10">
                          <td className="px-4 py-3 text-sm text-white">Apr 15, 2023</td>
                          <td className="px-4 py-3 text-sm text-white">$49.99</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                              Paid
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <a href="#" className="text-red-400 hover:text-red-300">
                              Download
                            </a>
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="px-4 py-3 text-sm text-white">Mar 15, 2023</td>
                          <td className="px-4 py-3 text-sm text-white">$49.99</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                              Paid
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <a href="#" className="text-red-400 hover:text-red-300">
                              Download
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-white">Feb 15, 2023</td>
                          <td className="px-4 py-3 text-sm text-white">$49.99</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                              Paid
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <a href="#" className="text-red-400 hover:text-red-300">
                              Download
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium">
                    Change Plan
                  </button>
                  <button className="px-6 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg font-medium">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>

                <form onSubmit={handleNotificationSubmit} className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label htmlFor="emailCampaigns" className="text-white">
                            Campaign updates
                          </label>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id="emailCampaigns"
                              name="emailCampaigns"
                              checked={notificationSettings.emailCampaigns}
                              onChange={handleNotificationChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-5 rounded-full transition ${
                                notificationSettings.emailCampaigns ? "bg-red-600" : "bg-stone-700"
                              }`}
                            >
                              <div
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                                  notificationSettings.emailCampaigns ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label htmlFor="emailProducts" className="text-white">
                            Product updates
                          </label>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id="emailProducts"
                              name="emailProducts"
                              checked={notificationSettings.emailProducts}
                              onChange={handleNotificationChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-5 rounded-full transition ${
                                notificationSettings.emailProducts ? "bg-red-600" : "bg-stone-700"
                              }`}
                            >
                              <div
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                                  notificationSettings.emailProducts ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label htmlFor="emailModels" className="text-white">
                            Model updates
                          </label>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id="emailModels"
                              name="emailModels"
                              checked={notificationSettings.emailModels}
                              onChange={handleNotificationChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-5 rounded-full transition ${
                                notificationSettings.emailModels ? "bg-red-600" : "bg-stone-700"
                              }`}
                            >
                              <div
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                                  notificationSettings.emailModels ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label htmlFor="emailAnalytics" className="text-white">
                            Analytics reports
                          </label>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id="emailAnalytics"
                              name="emailAnalytics"
                              checked={notificationSettings.emailAnalytics}
                              onChange={handleNotificationChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-5 rounded-full transition ${
                                notificationSettings.emailAnalytics ? "bg-red-600" : "bg-stone-700"
                              }`}
                            >
                              <div
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                                  notificationSettings.emailAnalytics ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Push Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label htmlFor="pushCampaigns" className="text-white">
                            Campaign updates
                          </label>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id="pushCampaigns"
                              name="pushCampaigns"
                              checked={notificationSettings.pushCampaigns}
                              onChange={handleNotificationChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-5 rounded-full transition ${
                                notificationSettings.pushCampaigns ? "bg-red-600" : "bg-stone-700"
                              }`}
                            >
                              <div
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                                  notificationSettings.pushCampaigns ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label htmlFor="pushProducts" className="text-white">
                            Product updates
                          </label>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id="pushProducts"
                              name="pushProducts"
                              checked={notificationSettings.pushProducts}
                              onChange={handleNotificationChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-5 rounded-full transition ${
                                notificationSettings.pushProducts ? "bg-red-600" : "bg-stone-700"
                              }`}
                            >
                              <div
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                                  notificationSettings.pushProducts ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label htmlFor="pushModels" className="text-white">
                            Model updates
                          </label>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id="pushModels"
                              name="pushModels"
                              checked={notificationSettings.pushModels}
                              onChange={handleNotificationChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-5 rounded-full transition ${
                                notificationSettings.pushModels ? "bg-red-600" : "bg-stone-700"
                              }`}
                            >
                              <div
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                                  notificationSettings.pushModels ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label htmlFor="pushAnalytics" className="text-white">
                            Analytics reports
                          </label>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id="pushAnalytics"
                              name="pushAnalytics"
                              checked={notificationSettings.pushAnalytics}
                              onChange={handleNotificationChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-5 rounded-full transition ${
                                notificationSettings.pushAnalytics ? "bg-red-600" : "bg-stone-700"
                              }`}
                            >
                              <div
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                                  notificationSettings.pushAnalytics ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : "Save Preferences"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Privacy Settings</h2>

                <form onSubmit={handlePrivacySubmit} className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Profile Visibility</h3>
                      <div className="space-y-2">
                        <div>
                          <select
                            id="profileVisibility"
                            name="profileVisibility"
                            value={privacySettings.profileVisibility}
                            onChange={handlePrivacyChange}
                            className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option value="public">Public - Visible to everyone</option>
                            <option value="private">Private - Only visible to you</option>
                            <option value="connections">Connections - Only visible to your connections</option>
                          </select>
                        </div>
                        <p className="text-white/60 text-sm">
                          Control who can see your profile information and activity.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Data Sharing</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <label htmlFor="dataSharing" className="text-white">
                              Share usage data to improve services
                            </label>
                            <p className="text-white/60 text-sm">
                              We use this data to improve our platform and services.
                            </p>
                          </div>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id="dataSharing"
                              name="dataSharing"
                              checked={privacySettings.dataSharing}
                              onChange={handlePrivacyChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-5 rounded-full transition ${
                                privacySettings.dataSharing ? "bg-red-600" : "bg-stone-700"
                              }`}
                            >
                              <div
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                                  privacySettings.dataSharing ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label htmlFor="marketingEmails" className="text-white">
                              Receive marketing emails
                            </label>
                            <p className="text-white/60 text-sm">
                              Get updates about new features and promotions.
                            </p>
                          </div>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id="marketingEmails"
                              name="marketingEmails"
                              checked={privacySettings.marketingEmails}
                              onChange={handlePrivacyChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-5 rounded-full transition ${
                                privacySettings.marketingEmails ? "bg-red-600" : "bg-stone-700"
                              }`}
                            >
                              <div
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                                  privacySettings.marketingEmails ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Account Actions</h3>
                      <div className="space-y-4">
                        <button
                          type="button"
                          className="w-full px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-left"
                        >
                          Download Your Data
                        </button>
                        <button
                          type="button"
                          className="w-full px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-left"
                        >
                          Delete Your Account
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : "Save Privacy Settings"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
