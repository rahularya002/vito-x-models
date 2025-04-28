"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ArrowUp, TrendingUp, MousePointerClick, Users, ShoppingCart } from "lucide-react"
import { getAnalyticsSummary, getAnalytics } from "@/app/actions/analytics"
import { getCampaigns } from "@/app/actions/campaigns"
import type { Campaign } from "@/lib/supabase"

type AnalyticsSummary = {
  totalImpressions: number
  totalEngagement: number
  totalClicks: number
  totalConversions: number
}

type AnalyticsData = {
  id: string
  campaign_id: string
  impressions: number
  engagement: number
  clicks: number
  conversions: number
  date: string
  campaigns: {
    id: string
    name: string
  }
}

const COLORS = ["#9e2a2b", "#e63946", "#f1c0b9", "#a8dadc", "#457b9d", "#1d3557"]

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch analytics summary
        const summaryData = await getAnalyticsSummary()
        if ("error" in summaryData) {
          setError(summaryData.error ?? "Unknown error")
        } else {
          setSummary(summaryData)
        }

        // Fetch analytics data
        const { analytics: analyticsData, error: analyticsError } = await getAnalytics()
        if (analyticsError) {
          setError(analyticsError)
        } else {
          setAnalytics(analyticsData || [])
        }

        // Fetch campaigns
        const { campaigns: campaignsData, error: campaignsError } = await getCampaigns()
        if (campaignsError) {
          console.error("Error fetching campaigns:", campaignsError)
        } else {
          setCampaigns(campaignsData || [])
        }
      } catch (err) {
        setError("Failed to fetch analytics data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Prepare data for campaign performance chart
  const campaignPerformanceData = campaigns
    .map((campaign) => {
      const campaignAnalytics = analytics.filter((a) => a.campaign_id === campaign.id)
      const impressions = campaignAnalytics.reduce((sum, a) => sum + a.impressions, 0)
      const engagement = campaignAnalytics.reduce((sum, a) => sum + a.engagement, 0)
      const clicks = campaignAnalytics.reduce((sum, a) => sum + a.clicks, 0)

      return {
        name: campaign.name,
        impressions,
        engagement,
        clicks,
      }
    })
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 5)

  // Prepare data for engagement distribution pie chart
  const engagementDistributionData = campaigns
    .map((campaign) => {
      const campaignAnalytics = analytics.filter((a) => a.campaign_id === campaign.id)
      const engagement = campaignAnalytics.reduce((sum, a) => sum + a.engagement, 0)

      return {
        name: campaign.name,
        value: engagement,
      }
    })
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  // Calculate percentage change (mock data for demo)
  const getPercentageChange = (metric: string) => {
    const changes = {
      impressions: 12.5,
      engagement: 8.3,
      clicks: 15.2,
      conversions: 5.7,
    }
    return changes[metric as keyof typeof changes] || 0
  }

  if (loading) {
    return (
      <div className="p-6 md:p-10 bg-black min-h-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Analytics</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-stone-900 rounded-xl p-6 border border-white/10 h-32"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 animate-pulse">
            <div className="bg-stone-900 rounded-xl p-6 border border-white/10 h-80"></div>
            <div className="bg-stone-900 rounded-xl p-6 border border-white/10 h-80"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Analytics</h1>

        {/* Error Message */}
        {error && <div className="mb-8 p-4 bg-red-900/30 border border-red-800 rounded-lg text-white">{error}</div>}

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Impressions</p>
                  <h3 className="text-3xl font-bold text-white mt-1">{formatNumber(summary.totalImpressions)}</h3>
                </div>
                <div className="bg-red-800/20 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-red-800" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+{getPercentageChange("impressions")}% from last month</span>
              </div>
            </div>

            <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Engagement</p>
                  <h3 className="text-3xl font-bold text-white mt-1">{formatNumber(summary.totalEngagement)}</h3>
                </div>
                <div className="bg-blue-800/20 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+{getPercentageChange("engagement")}% from last month</span>
              </div>
            </div>

            <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Clicks</p>
                  <h3 className="text-3xl font-bold text-white mt-1">{formatNumber(summary.totalClicks)}</h3>
                </div>
                <div className="bg-purple-800/20 p-3 rounded-lg">
                  <MousePointerClick className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+{getPercentageChange("clicks")}% from last month</span>
              </div>
            </div>

            <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Conversions</p>
                  <h3 className="text-3xl font-bold text-white mt-1">{formatNumber(summary.totalConversions)}</h3>
                </div>
                <div className="bg-green-800/20 p-3 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+{getPercentageChange("conversions")}% from last month</span>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Campaign Performance Chart */}
          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Campaign Performance</h2>
            {campaignPerformanceData.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-white/50">No data available</div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" tick={{ fill: "#999" }} angle={-45} textAnchor="end" height={70} />
                    <YAxis tick={{ fill: "#999" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="impressions" name="Impressions" fill="#9e2a2b" />
                    <Bar dataKey="engagement" name="Engagement" fill="#457b9d" />
                    <Bar dataKey="clicks" name="Clicks" fill="#e63946" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Engagement Distribution Chart */}
          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Engagement Distribution</h2>
            {engagementDistributionData.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-white/50">No data available</div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {engagementDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                      itemStyle={{ color: "#fff" }}
                      formatter={(value) => formatNumber(value as number)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Campaign Analytics Links */}
        <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Campaign Analytics</h2>
            <Link href="/dashboard/campaigns" className="text-red-800 hover:underline text-sm">
              View All Campaigns
            </Link>
          </div>

          {campaigns.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/70 mb-4">You don't have any campaigns yet.</p>
              <Link
                href="/dashboard/campaigns/new"
                className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Create Your First Campaign
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">Campaign</th>
                    <th className="text-right py-3 px-4">Impressions</th>
                    <th className="text-right py-3 px-4">Engagement</th>
                    <th className="text-right py-3 px-4">Clicks</th>
                    <th className="text-right py-3 px-4">Conversions</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => {
                    const campaignAnalytics = analytics.filter((a) => a.campaign_id === campaign.id)
                    const impressions = campaignAnalytics.reduce((sum, a) => sum + a.impressions, 0)
                    const engagement = campaignAnalytics.reduce((sum, a) => sum + a.engagement, 0)
                    const clicks = campaignAnalytics.reduce((sum, a) => sum + a.clicks, 0)
                    const conversions = campaignAnalytics.reduce((sum, a) => sum + a.conversions, 0)

                    return (
                      <tr key={campaign.id} className="border-b border-white/10 hover:bg-stone-800">
                        <td className="py-4 px-4">{campaign.name}</td>
                        <td className="text-right py-4 px-4">{formatNumber(impressions)}</td>
                        <td className="text-right py-4 px-4">{formatNumber(engagement)}</td>
                        <td className="text-right py-4 px-4">{formatNumber(clicks)}</td>
                        <td className="text-right py-4 px-4">{formatNumber(conversions)}</td>
                        <td className="text-right py-4 px-4">
                          <Link
                            href={`/dashboard/campaigns/${campaign.id}/analytics`}
                            className="text-red-800 hover:underline"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
