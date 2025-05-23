import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle, UserPlus, User, UserCheck } from "lucide-react"
import { notFound } from "next/navigation"

// Mock product request data
const mockRequests = {
  "1": {
    id: "1",
    status: "pending",
    created_at: "2023-08-15T10:30:00Z",
    updated_at: "2023-08-15T10:30:00Z",
    product_images: ["/product-1.jpg", "/product-2.jpg"],
    name: "Summer Collection Dress",
    description:
      "A lightweight summer dress with floral pattern, perfect for casual outings and beach days. Made from 100% cotton for maximum comfort in hot weather.",
    category: "Apparel",
    subcategory: "Dresses",
    brand: "FashionCo",
    price: 89.99,
    colors: ["White", "Blue", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "100% Cotton",
    admin_notes: "",
    client: {
      id: "c1",
      name: "StyleHub Boutique",
      email: "contact@stylehub.com",
      phone: "+1 (555) 123-4567",
      avatar_url: "/model-avatar-2.jpg",
    },
    assigned_model: null,
  },
  "2": {
    id: "2",
    status: "approved",
    created_at: "2023-07-22T14:45:00Z",
    updated_at: "2023-07-25T09:15:00Z",
    product_images: ["/product-3.jpg", "/product-4.jpg"],
    name: "Designer Handbag",
    description:
      "Premium leather handbag with gold-plated hardware and signature pattern. Includes adjustable shoulder strap and multiple interior compartments.",
    category: "Accessories",
    subcategory: "Handbags",
    brand: "LuxeBrand",
    price: 299.99,
    colors: ["Black", "Brown", "Red"],
    sizes: ["One Size"],
    material: "Genuine Leather",
    admin_notes: "High-quality product, approved for premium campaign.",
    client: {
      id: "c2",
      name: "Luxury Goods Inc.",
      email: "info@luxurygoods.com",
      phone: "+1 (555) 987-6543",
      avatar_url: "/model-avatar-4.jpg",
    },
    assigned_model: {
      id: "m1",
      name: "Emma Johnson",
      avatar_url: "/model-avatar-2.jpg",
    },
  },
}

// Mock models data for assignment
const mockModels = [
  {
    id: "m1",
    name: "Emma Johnson",
    avatar_url: "/model-avatar-2.jpg",
    height: "5'9\"",
    experience: "3 years",
    categories: ["Fashion", "Commercial"],
  },
  {
    id: "m2",
    name: "Sophia Williams",
    avatar_url: "/model-avatar-4.jpg",
    height: "5'11\"",
    experience: "5 years",
    categories: ["Runway", "Editorial"],
  },
  {
    id: "m3",
    name: "Michael Brown",
    avatar_url: "/model-avatar-3.jpg",
    height: "6'1\"",
    experience: "1 year",
    categories: ["Commercial"],
  },
  {
    id: "m4",
    name: "James Davis",
    avatar_url: "/model-avatar-1.jpg",
    height: "6'0\"",
    experience: "2 years",
    categories: ["Fitness", "Commercial"],
  },
]

export default async function ProductRequestDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // Get the product request with profile data
  const request = mockRequests[resolvedParams.id as keyof typeof mockRequests]

  if (!request) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/product-requests"
          className="bg-stone-900 hover:bg-stone-800 text-white p-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Product Request</h1>
          <p className="text-white/60">Review product submission details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Product Images</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {request.product_images && request.product_images.length > 0 ? (
                request.product_images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full h-64 flex items-center justify-center bg-stone-800 text-white/60 rounded-lg">
                  No product images
                </div>
              )}
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Product Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 mb-1">Product Name</p>
                <p className="text-white text-lg">{request.name}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Brand</p>
                <p className="text-white text-lg">{request.brand}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Category</p>
                <p className="text-white text-lg">
                  {request.category} / {request.subcategory}
                </p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Price</p>
                <p className="text-white text-lg">${request.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Material</p>
                <p className="text-white text-lg">{request.material}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Available Colors</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {request.colors.map((color) => (
                    <span key={color} className="px-2 py-1 bg-stone-800 rounded-md text-white text-sm">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/60 mb-1">Description</p>
                <p className="text-white">{request.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Available Sizes</h2>

            <div className="flex flex-wrap gap-3">
              {request.sizes.map((size) => (
                <div key={size} className="px-4 py-2 bg-stone-800 rounded-lg text-white font-medium">
                  {size}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Client Information</h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={request.client.avatar_url || "/placeholder.svg"}
                  alt={request.client.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{request.client.name}</h3>
                <p className="text-white/60">{request.client.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white/60 mb-1">Phone</p>
                <p className="text-white">{request.client.phone}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Status</p>
                <div className="flex items-center gap-2">
                  {request.status === "pending" ? (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm">
                      Pending
                    </span>
                  ) : request.status === "approved" ? (
                    <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                      Approved
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Assigned Model</h2>

            {request.assigned_model ? (
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={request.assigned_model.avatar_url || "/placeholder.svg"}
                    alt={request.assigned_model.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{request.assigned_model.name}</h3>
                  <p className="text-white/60">Model ID: {request.assigned_model.id}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/60 mb-4">No model assigned yet</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Assign Model
                </button>
              </div>
            )}
          </div>

          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Admin Notes</h2>

            <div className="space-y-4">
              <textarea
                className="w-full h-32 bg-stone-800 border border-white/10 rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add notes about this product request..."
                value={request.admin_notes}
                readOnly
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
