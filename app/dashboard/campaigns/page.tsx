"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Calendar, DollarSign, BarChart3 } from "lucide-react"
import { getCampaigns } from "@/app/actions/campaigns"
import type { Campaign } from "@/lib/supabase"

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true)
      try {
        const { campaigns: fetchedCampaigns, error } = await getCampaigns()
        if (error) {
          setError(error)
        } else {
          setCampaigns(fetchedCampaigns || [])
          setError(null)
        }
      } catch (err) {
        setError("Failed to fetch campaigns")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Helper function to get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "#10b981" // green-500
      case "draft":
        return "#f59e0b" // yellow-500
      case "completed":
        return "#6b7280" // gray-500
      default:
        return "#6b7280" // gray-500
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Campaigns</h1>
            <p className="text-white/70">Manage your marketing campaigns</p>
          </div>

          <Link
            href="/dashboard/campaigns/new"
            className="mt-4 md:mt-0 bg-red-800 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Campaign
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
            />
          </div>
        </div>

        {/* Error State */}
        {error && <div className="mb-8 p-4 bg-red-900/30 border border-red-800 rounded-lg text-white">{error}</div>}

        {/* Loading State */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-stone-900 rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-stone-800 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-stone-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-stone-800 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-8 bg-stone-800 rounded w-24"></div>
                  <div className="h-8 bg-stone-800 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Campaigns List */}
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-12 bg-stone-900 rounded-xl border border-white/10">
                <BarChart3 className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Campaigns Found</h3>
                <p className="text-white/70 mb-6">
                  {searchQuery ? "No campaigns match your search criteria." : "You haven't created any campaigns yet."}
                </p>
                <Link
                  href="/dashboard/campaigns/new"
                  className="bg-red-800 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded-lg inline-flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Campaign
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-stone-900 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <h2 className="text-xl font-bold text-white">{campaign.name}</h2>
                          <div
                            className="ml-3 px-2 py-1 text-xs rounded-full text-white capitalize"
                            style={{ backgroundColor: getStatusColor(campaign.status) }}
                          >
                            {campaign.status}
                          </div>
                        </div>
                        <p className="text-white/70 mb-4">{campaign.description || "No description provided"}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-white/70">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {formatDate(campaign.start_date)}
                              {campaign.end_date ? ` - ${formatDate(campaign.end_date)}` : " (No end date)"}
                            </span>
                          </div>
                          {campaign.budget && (
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              <span>${campaign.budget.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-3">
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}`}
                          className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors text-center"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}/analytics`}
                          className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors text-center"
                        >
                          Analytics
                        </Link>
                      </div>
                    </div>

                    {/* Campaign Products Preview */}
                    {campaign.campaign_products && campaign.campaign_products.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <h3 className="text-sm font-medium text-white/70 mb-3">Products in this campaign:</h3>
                        <div className="flex flex-wrap gap-2">
                          {campaign.campaign_products.slice(0, 5).map((cp, index) => (
                            <div key={index} className="px-3 py-1 bg-stone-800 text-white text-sm rounded-full">
                              {cp.products.name}
                            </div>
                          ))}
                          {campaign.campaign_products.length > 5 && (
                            <div className="px-3 py-1 bg-stone-800 text-white text-sm rounded-full">
                              +{campaign.campaign_products.length - 5} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
