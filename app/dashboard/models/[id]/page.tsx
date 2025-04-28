"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, Award, Check, Clock, Ruler, Calendar, Tag } from "lucide-react"
import { getModel, assignModelToProduct } from "@/app/actions/models"
import { getProducts } from "@/app/actions/products"
import type { Model, Product } from "@/lib/supabase"

export default function ModelDetailPage({ params }: { params: { id: string } }) {
  const [model, setModel] = useState<Model | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<string>("")
  const [isAssigning, setIsAssigning] = useState(false)
  const [assignmentSuccess, setAssignmentSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch model details
        const { model: fetchedModel, error: modelError } = await getModel(params.id)
        if (modelError) {
          setError(modelError)
        } else {
          setModel(fetchedModel)
        }

        // Fetch user's products
        const { products: fetchedProducts, error: productsError } = await getProducts()
        if (productsError) {
          console.error("Error fetching products:", productsError)
        } else {
          setProducts(fetchedProducts || [])
        }
      } catch (err) {
        setError("Failed to fetch data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleAssignModel = async () => {
    if (!selectedProductId || !model) return

    setIsAssigning(true)
    try {
      const { error } = await assignModelToProduct(selectedProductId, model.id)
      if (error) {
        setError(error)
      } else {
        setAssignmentSuccess(true)
        setTimeout(() => {
          router.push(`/dashboard/products/${selectedProductId}`)
        }, 2000)
      }
    } catch (err) {
      setError("Failed to assign model")
      console.error(err)
    } finally {
      setIsAssigning(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 md:p-10 bg-black min-h-full">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-stone-800 rounded w-1/4 mb-4"></div>
            <div className="h-80 bg-stone-800 rounded-xl mb-6"></div>
            <div className="h-6 bg-stone-800 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-stone-800 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-stone-800 rounded w-2/3 mb-6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !model) {
    return (
      <div className="p-6 md:p-10 bg-black min-h-full">
        <div className="max-w-5xl mx-auto">
          <div className="p-6 bg-red-900/30 border border-red-800 rounded-lg text-white">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error || "Failed to load model details"}</p>
            <Link href="/dashboard/models" className="mt-4 inline-block text-red-800 hover:underline">
              Back to Models
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/dashboard/models"
          className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Models
        </Link>

        {/* Success Message */}
        {assignmentSuccess && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-800 rounded-lg text-white flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            Model successfully assigned to product! Redirecting...
          </div>
        )}

        {/* Error Message */}
        {error && <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-white">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Model Image */}
          <div className="md:col-span-1">
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <Image src={model.avatar_url || "/placeholder.svg"} alt={model.name} fill className="object-cover" />
              {model.is_ai && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full">AI Generated</div>
              )}
            </div>
          </div>

          {/* Model Details */}
          <div className="md:col-span-2">
            <div className="bg-stone-900 rounded-xl p-6 border border-white/10 h-full">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-white">{model.name}</h1>
                {!model.is_ai && (
                  <div className="flex items-center bg-stone-800 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-white">4.8</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-red-800 mr-2" />
                  <span className="text-white/70">Gender: </span>
                  <span className="text-white ml-1">{model.gender}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-red-800 mr-2" />
                  <span className="text-white/70">Age Range: </span>
                  <span className="text-white ml-1">{model.age_range}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-red-800 mr-2" />
                  <span className="text-white/70">Style: </span>
                  <span className="text-white ml-1">{model.style}</span>
                </div>
                {model.height && (
                  <div className="flex items-center">
                    <Ruler className="h-5 w-5 text-red-800 mr-2" />
                    <span className="text-white/70">Height: </span>
                    <span className="text-white ml-1">{model.height}</span>
                  </div>
                )}
                {model.experience && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-red-800 mr-2" />
                    <span className="text-white/70">Experience: </span>
                    <span className="text-white ml-1">{model.experience}</span>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-3">About</h2>
                <p className="text-white/70">
                  {model.is_ai
                    ? "This is an AI-generated model created based on your product specifications. You can use this model to visualize how your products will look in professional promotional materials."
                    : "Professional model with extensive experience in fashion and commercial photography. Specializes in editorial and runway work with a strong portfolio of high-end brand collaborations."}
                </p>
              </div>

              {/* Assign to Product */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Assign to Product</h2>
                {products.length === 0 ? (
                  <p className="text-white/70 mb-4">
                    You don't have any products yet.{" "}
                    <Link href="/dashboard/products/new" className="text-red-800 hover:underline">
                      Add a product
                    </Link>{" "}
                    to assign this model.
                  </p>
                ) : (
                  <>
                    <div className="mb-4">
                      <label htmlFor="product" className="block text-white/70 text-sm mb-2">
                        Select Product
                      </label>
                      <select
                        id="product"
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                      >
                        <option value="" disabled className="bg-black">
                          Select a product
                        </option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id} className="bg-black">
                            {product.name} ({product.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleAssignModel}
                      disabled={!selectedProductId || isAssigning}
                      className="w-full py-3 bg-red-800 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70"
                    >
                      {isAssigning ? "Assigning..." : "Assign Model to Product"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Gallery */}
        {!model.is_ai && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-6">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative h-80 rounded-xl overflow-hidden">
                  <Image src={`/model-portfolio-${i}.jpg`} alt={`Portfolio image ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
