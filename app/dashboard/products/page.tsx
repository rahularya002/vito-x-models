"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Filter, AlertCircle, X } from "lucide-react"
import { getProducts } from "@/app/actions/products"

interface ProductImage {
  id: string
  url: string
  type: string
  created_at: string
}

interface Product {
  id: string
  name: string
  collection_name: string
  category: string
  description: string
  target_audience: string
  status: string
  brand: string
  user_id: string
  mongodb_user_id: string
  product_images: ProductImage[]
  created_at: string
  updated_at: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
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

  // Helper function to get the full image URL
  const getImageUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    }
    
    // If it's just a filename, get the public URL from Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return `${supabaseUrl}/storage/v1/object/public/product-images/${url}`;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#22c55e' // green-500
      case 'pending':
        return '#eab308' // yellow-500
      case 'in review':
        return '#3b82f6' // blue-500
      default:
        return '#6b7280' // gray-500
    }
  }

  if (loading) {
    return (
      <div className="p-6 md:p-10 bg-black min-h-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-white">Loading products...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 md:p-10 bg-black min-h-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Products</h1>
            <p className="text-white/70">Manage and view product details</p>
          </div>
          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-2 bg-red-800 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add New Product
          </Link>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-stone-900 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>
          <button className="bg-stone-900 border border-white/10 rounded-lg p-2 text-white hover:bg-stone-800 transition-colors">
            <Filter className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-stone-900 rounded-xl border border-white/10 p-6">
              <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                {product.product_images && product.product_images.length > 0 ? (
                  <Image
                    src={product.product_images[0].url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-800 flex items-center justify-center">
                    <span className="text-white/60">No image</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-white font-medium mb-2">{product.name}</h3>
              <p className="text-white/60 text-sm mb-4">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">{product.category}</span>
                <span className="text-white/40 text-sm">{product.status}</span>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="bg-stone-900 rounded-xl p-8 text-center border border-white/10">
            <AlertCircle className="h-12 w-12 text-white/40 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Products Found</h2>
            <p className="text-white/70 mb-6">You haven't added any products yet.</p>
            <Link
              href="/dashboard/products/new"
              className="bg-red-800 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors inline-block"
            >
              Add Your First Product
            </Link>
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-stone-900 rounded-xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-white/60 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white/60 text-sm mb-2">Description</h3>
                      <p className="text-white">{selectedProduct.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-white/60 text-sm mb-2">Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/60">Category</span>
                          <span className="text-white">{selectedProduct.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Collection</span>
                          <span className="text-white">{selectedProduct.collection_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Target Audience</span>
                          <span className="text-white">{selectedProduct.target_audience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Status</span>
                          <span className="px-2 py-1 rounded-full text-xs text-white" style={{ backgroundColor: getStatusColor(selectedProduct.status) }}>
                            {selectedProduct.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Created</span>
                          <span className="text-white">{new Date(selectedProduct.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white/60 text-sm mb-4">Product Images</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProduct.product_images && selectedProduct.product_images.length > 0 ? (
                        selectedProduct.product_images.map((img, idx) => (
                          <div key={idx} className="relative aspect-square">
                            <Image
                              src={img.url.startsWith('http') ? img.url : getImageUrl(img.url)}
                              alt={`${selectedProduct.name} - ${img.type}`}
                              fill
                              className="object-cover rounded-lg"
                              unoptimized
                            />
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                              {img.type}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 h-48 bg-stone-800 rounded-lg flex items-center justify-center text-white/60">
                          No images available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
