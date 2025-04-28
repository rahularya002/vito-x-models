"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Star, ChevronDown } from "lucide-react"
import { getModels } from "@/app/actions/models"
import type { Model } from "@/lib/supabase"

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    gender: "any",
    style: "any",
    ageRange: "any",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true)
      try {
        const { models: fetchedModels, error } = await getModels(filters)
        if (error) {
          setError(error)
        } else {
          setModels(fetchedModels || [])
          setError(null)
        }
      } catch (err) {
        setError("Failed to fetch models")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [filters])

  const filteredModels = models.filter((model) => model.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Models</h1>
            <p className="text-white/70">Browse and select models for your products</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
            />
          </div>

          <button
            className="flex items-center justify-center px-4 py-3 bg-stone-900 border border-white/10 rounded-lg text-white hover:bg-stone-800 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filter
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-8 p-6 bg-stone-900 rounded-lg border border-white/10">
            <h3 className="text-white font-medium mb-4">Filter Models</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="gender" className="block text-white/70 text-sm mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                >
                  <option value="any" className="bg-black">
                    Any
                  </option>
                  <option value="female" className="bg-black">
                    Female
                  </option>
                  <option value="male" className="bg-black">
                    Male
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="style" className="block text-white/70 text-sm mb-2">
                  Style
                </label>
                <select
                  id="style"
                  name="style"
                  value={filters.style}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                >
                  <option value="any" className="bg-black">
                    Any
                  </option>
                  <option value="high-fashion" className="bg-black">
                    High Fashion
                  </option>
                  <option value="commercial" className="bg-black">
                    Commercial
                  </option>
                  <option value="editorial" className="bg-black">
                    Editorial
                  </option>
                  <option value="fitness" className="bg-black">
                    Fitness
                  </option>
                  <option value="casual" className="bg-black">
                    Casual
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="ageRange" className="block text-white/70 text-sm mb-2">
                  Age Range
                </label>
                <select
                  id="ageRange"
                  name="ageRange"
                  value={filters.ageRange}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                >
                  <option value="any" className="bg-black">
                    Any
                  </option>
                  <option value="18-25" className="bg-black">
                    18-25
                  </option>
                  <option value="26-35" className="bg-black">
                    26-35
                  </option>
                  <option value="36-45" className="bg-black">
                    36-45
                  </option>
                  <option value="46+" className="bg-black">
                    46+
                  </option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && <div className="mb-8 p-4 bg-red-900/30 border border-red-800 rounded-lg text-white">{error}</div>}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-stone-900 rounded-xl overflow-hidden animate-pulse">
                <div className="h-80 bg-stone-800"></div>
                <div className="p-4">
                  <div className="h-6 bg-stone-800 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-stone-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Models Grid */}
            {filteredModels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/70">No models found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredModels.map((model) => (
                  <div key={model.id} className="bg-stone-900 rounded-xl overflow-hidden border border-white/10 group">
                    <div className="relative h-80">
                      <Image
                        src={model.avatar_url || "/placeholder.svg"}
                        alt={model.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {model.is_ai && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          AI Generated
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-white">{model.name}</h3>
                        {model.is_ai ? null : (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-white/70 text-sm">4.8</span>
                          </div>
                        )}
                      </div>
                      <p className="text-white/70 text-sm mt-1">
                        {model.gender}, {model.age_range}
                      </p>
                      <p className="text-white/70 text-sm">{model.style}</p>
                      <Link
                        href={`/dashboard/models/${model.id}`}
                        className="mt-4 block w-full py-2 bg-stone-800 text-white text-center rounded-lg hover:bg-stone-700 transition-colors"
                      >
                        View Profile
                      </Link>
                    </div>
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
