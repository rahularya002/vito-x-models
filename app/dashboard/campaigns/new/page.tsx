"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, DollarSign, Info, X } from "lucide-react"
import { createCampaign } from "@/app/actions/campaigns"
import { getProducts } from "@/app/actions/products"
import type { Product } from "@/lib/supabase"

export default function NewCampaignPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const { products: fetchedProducts, error } = await getProducts()
        if (error) {
          setError(error)
        } else {
          setProducts(fetchedProducts || [])
        }
      } catch (err) {
        setError("Failed to fetch products")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    if (selectedProducts.length === 0) {
      setError("Please select at least one product for your campaign")
      setSubmitting(false)
      return
    }

    try {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append("name", formData.name)
      formDataToSubmit.append("description", formData.description)
      formDataToSubmit.append("startDate", formData.startDate)
      if (formData.endDate) formDataToSubmit.append("endDate", formData.endDate)
      if (formData.budget) formDataToSubmit.append("budget", formData.budget)

      // Add selected products
      selectedProducts.forEach((productId) => {
        formDataToSubmit.append("productIds", productId)
      })

      const { success, campaignId, error } = await createCampaign(formDataToSubmit)

      if (error) {
        setError(error)
      } else if (success && campaignId) {
        router.push(`/dashboard/campaigns/${campaignId}`)
      }
    } catch (err) {
      setError("Failed to create campaign")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/dashboard/campaigns"
          className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Create New Campaign</h1>
        <p className="text-white/70 mb-8">Set up a marketing campaign for your products</p>

        {/* Error Message */}
        {error && <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-white">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Campaign Details */}
          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Campaign Details</h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Campaign Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                  placeholder="e.g. Summer Collection Launch"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-white font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                  placeholder="Describe your campaign goals and strategy..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-white font-medium mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-white font-medium mb-2">
                    End Date <span className="text-white/50">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="budget" className="block text-white font-medium mb-2">
                  Budget <span className="text-white/50">(Optional)</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    placeholder="e.g. 5000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Selection */}
          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Select Products</h2>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-stone-800 rounded-lg p-4 animate-pulse">
                    <div className="h-6 bg-stone-700 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-stone-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white/70 mb-4">You don't have any products yet.</p>
                <Link
                  href="/dashboard/products/new"
                  className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Add Your First Product
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-4 bg-stone-800 p-4 rounded-lg flex items-start">
                  <Info className="h-5 w-5 text-red-800 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-white/70 text-sm">
                    Select the products you want to include in this campaign. You can add multiple products to promote
                    together.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-colors ${
                        selectedProducts.includes(product.id)
                          ? "border-red-800 bg-red-800/10"
                          : "border-white/10 hover:border-white/30"
                      }`}
                      onClick={() => toggleProductSelection(product.id)}
                    >
                      <div className="flex items-center p-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-stone-800 mr-4">
                          {product.product_images && product.product_images[0] ? (
                            <Image
                              src={product.product_images[0].url || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-white/30">No image</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{product.name}</h3>
                          <p className="text-white/70 text-sm">{product.category}</p>
                        </div>
                        {selectedProducts.includes(product.id) && (
                          <div className="h-6 w-6 rounded-full bg-red-800 flex items-center justify-center">
                            <X className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-white/70 text-sm">
                  {selectedProducts.length} product{selectedProducts.length !== 1 && "s"} selected
                </div>
              </>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-end">
            <Link
              href="/dashboard/campaigns"
              className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting || loading || products.length === 0}
              className="px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70"
            >
              {submitting ? "Creating Campaign..." : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
