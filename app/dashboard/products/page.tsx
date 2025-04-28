import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Filter, AlertCircle } from "lucide-react"

// Sample product data
const products = [
  {
    id: 1,
    name: "Black Leather Jacket",
    collection: "Premium Collection",
    image: "/product-1.jpg",
    status: "Active",
    statusColor: "green",
    modelAssigned: true,
    modelImage: "/model-avatar-1.jpg",
    dateAdded: "2023-04-15",
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    collection: "Spring Collection",
    image: "/product-2.jpg",
    status: "Pending",
    statusColor: "yellow",
    modelAssigned: false,
    dateAdded: "2023-04-10",
  },
  {
    id: 3,
    name: "Urban Sneakers",
    collection: "Streetwear Collection",
    image: "/product-3.jpg",
    status: "In Review",
    statusColor: "blue",
    modelAssigned: true,
    modelImage: "/model-avatar-2.jpg",
    dateAdded: "2023-04-05",
  },
  {
    id: 4,
    name: "Denim Jeans",
    collection: "Casual Collection",
    image: "/product-4.jpg",
    status: "Active",
    statusColor: "green",
    modelAssigned: true,
    modelImage: "/model-avatar-3.jpg",
    dateAdded: "2023-03-28",
  },
  {
    id: 5,
    name: "Silk Scarf",
    collection: "Accessories Collection",
    image: "/product-5.jpg",
    status: "Pending",
    statusColor: "yellow",
    modelAssigned: false,
    dateAdded: "2023-03-22",
  },
  {
    id: 6,
    name: "Wool Coat",
    collection: "Winter Collection",
    image: "/product-6.jpg",
    status: "Active",
    statusColor: "green",
    modelAssigned: true,
    modelImage: "/model-avatar-4.jpg",
    dateAdded: "2023-03-15",
  },
]

export default function ProductsPage() {
  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Products</h1>
            <p className="text-white/70">Manage your products and model assignments</p>
          </div>

          <Link
            href="/dashboard/products/new"
            className="mt-4 md:mt-0 bg-red-800 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Product
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
            />
          </div>

          <button className="flex items-center justify-center px-4 py-3 bg-stone-900 border border-white/10 rounded-lg text-white hover:bg-stone-800 transition-colors">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-stone-900 rounded-xl overflow-hidden border border-white/10">
              <div className="relative h-48">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <div
                  className={`absolute top-2 right-2 bg-${product.statusColor}-500 text-white text-xs px-2 py-1 rounded-full`}
                  style={{ backgroundColor: getStatusColor(product.status) }}
                >
                  {product.status}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">{product.name}</h3>
                <p className="text-white/70 text-sm mt-1">{product.collection}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    {product.modelAssigned ? (
                      <>
                        <div className="h-8 w-8 rounded-full bg-gray-700 overflow-hidden relative mr-2">
                          <Image
                            src={product.modelImage || "/placeholder.svg"}
                            alt="Model"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-white/70 text-sm">Model assigned</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-white/70 text-sm">No model assigned</span>
                      </>
                    )}
                  </div>
                  <Link href={`/dashboard/products/${product.id}`} className="text-red-800 hover:underline text-sm">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper function to get status color
function getStatusColor(status: string): string {
  switch (status) {
    case "Active":
      return "#10b981" // green-500
    case "Pending":
      return "#f59e0b" // yellow-500
    case "In Review":
      return "#3b82f6" // blue-500
    default:
      return "#6b7280" // gray-500
  }
}
