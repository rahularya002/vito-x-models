"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"

export async function getAnalytics() {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Get user's campaigns
  const { data: campaigns, error: campaignsError } = await supabase
    .from("campaigns")
    .select("id")
    .eq("user_id", session.user.id)

  if (campaignsError) {
    console.error("Error fetching campaigns:", campaignsError)
    return { error: campaignsError.message }
  }

  if (!campaigns || campaigns.length === 0) {
    return { analytics: [] }
  }

  const campaignIds = campaigns.map((c) => c.id)

  // Get analytics for user's campaigns
  const { data, error } = await supabase
    .from("analytics")
    .select(`
      *,
      campaigns (
        id,
        name
      )
    `)
    .in("campaign_id", campaignIds)
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching analytics:", error)
    return { error: error.message }
  }

  return { analytics: data }
}

export async function getCampaignAnalytics(campaignId: string) {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Verify campaign belongs to user
  const { data: campaign, error: campaignError } = await supabase
    .from("campaigns")
    .select("id")
    .eq("id", campaignId)
    .eq("user_id", session.user.id)
    .single()

  if (campaignError || !campaign) {
    console.error("Error verifying campaign ownership:", campaignError)
    return { error: "You do not have permission to view this campaign" }
  }

  // Get analytics for campaign
  const { data, error } = await supabase
    .from("analytics")
    .select("*")
    .eq("campaign_id", campaignId)
    .order("date", { ascending: true })

  if (error) {
    console.error("Error fetching campaign analytics:", error)
    return { error: error.message }
  }

  return { analytics: data }
}

export async function getAnalyticsSummary() {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Get user's campaigns
  const { data: campaigns, error: campaignsError } = await supabase
    .from("campaigns")
    .select("id")
    .eq("user_id", session.user.id)

  if (campaignsError) {
    console.error("Error fetching campaigns:", campaignsError)
    return { error: campaignsError.message }
  }

  if (!campaigns || campaigns.length === 0) {
    return {
      totalImpressions: 0,
      totalEngagement: 0,
      totalClicks: 0,
      totalConversions: 0,
    }
  }

  const campaignIds = campaigns.map((c) => c.id)

  // Get analytics for user's campaigns
  const { data, error } = await supabase
    .from("analytics")
    .select(`
      impressions,
      engagement,
      clicks,
      conversions
    `)
    .in("campaign_id", campaignIds)

  if (error) {
    console.error("Error fetching analytics summary:", error)
    return { error: error.message }
  }

  // Calculate totals
  const summary = {
    totalImpressions: data.reduce((sum, item) => sum + item.impressions, 0),
    totalEngagement: data.reduce((sum, item) => sum + item.engagement, 0),
    totalClicks: data.reduce((sum, item) => sum + item.clicks, 0),
    totalConversions: data.reduce((sum, item) => sum + item.conversions, 0),
  }

  return summary
}
