import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Users, FileText, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Fashion Brand</h1>
          <p className="text-white/70">Manage your product promotions and model collaborations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm">Active Products</p>
                <h3 className="text-3xl font-bold text-white mt-1">12</h3>
              </div>
              <div className="bg-red-800/20 p-3 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-red-800" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+3 this month</span>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm">Models Selected</p>
                <h3 className="text-3xl font-bold text-white mt-1">8</h3>
              </div>
              <div className="bg-blue-800/20 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+2 this month</span>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm">Active Campaigns</p>
                <h3 className="text-3xl font-bold text-white mt-1">3</h3>
              </div>
              <div className="bg-purple-800/20 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-yellow-500">1 ending soon</span>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Impressions</p>
                <h3 className="text-3xl font-bold text-white mt-1">24.5K</h3>
              </div>
              <div className="bg-green-800/20 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+12% from last month</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/dashboard/products/new"
              className="bg-red-800 hover:bg-red-700 transition-colors rounded-xl p-6 text-white flex items-center justify-center"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              <span>Add New Product</span>
            </Link>

            <Link
              href="/dashboard/models"
              className="bg-stone-800 hover:bg-stone-700 transition-colors rounded-xl p-6 text-white flex items-center justify-center"
            >
              <Users className="h-5 w-5 mr-2" />
              <span>Browse Models</span>
            </Link>

            <Link
              href="/dashboard/campaigns/new"
              className="bg-stone-800 hover:bg-stone-700 transition-colors rounded-xl p-6 text-white flex items-center justify-center"
            >
              <FileText className="h-5 w-5 mr-2" />
              <span>Create Campaign</span>
            </Link>
          </div>
        </div>

        {/* Recent Products */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Recent Products</h2>
            <Link href="/dashboard/products" className="text-red-800 hover:underline text-sm">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product 1 */}
            <div className="bg-stone-900 rounded-xl overflow-hidden border border-white/10">
              <div className="relative h-48">
                <Image src="/product-1.jpg" alt="Black leather jacket" fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Active
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">Black Leather Jacket</h3>
                <p className="text-white/70 text-sm mt-1">Premium Collection</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-700 overflow-hidden relative mr-2">
                      <Image src="/model-avatar-1.jpg" alt="Model" fill className="object-cover" />
                    </div>
                    <span className="text-white/70 text-sm">Model assigned</span>
                  </div>
                  <Link href="/dashboard/products/1" className="text-red-800 hover:underline text-sm">
                    Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-stone-900 rounded-xl overflow-hidden border border-white/10">
              <div className="relative h-48">
                <Image src="/product-2.jpg" alt="Summer dress" fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  Pending
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">Summer Floral Dress</h3>
                <p className="text-white/70 text-sm mt-1">Spring Collection</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-white/70 text-sm">Awaiting model selection</span>
                  </div>
                  <Link href="/dashboard/products/2" className="text-red-800 hover:underline text-sm">
                    Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-stone-900 rounded-xl overflow-hidden border border-white/10">
              <div className="relative h-48">
                <Image src="/product-3.jpg" alt="Sneakers" fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  In Review
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">Urban Sneakers</h3>
                <p className="text-white/70 text-sm mt-1">Streetwear Collection</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-white/70 text-sm">Photoshoot scheduled</span>
                  </div>
                  <Link href="/dashboard/products/3" className="text-red-800 hover:underline text-sm">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Performance */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Campaign Performance</h2>
            <Link href="/dashboard/analytics" className="text-red-800 hover:underline text-sm">
              View Analytics
            </Link>
          </div>

          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-white">Summer Collection</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Impressions</span>
                  <span className="text-white font-medium">12.4K</span>
                </div>
                <div className="w-full bg-stone-800 rounded-full h-2">
                  <div className="bg-red-800 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Engagement</span>
                  <span className="text-white font-medium">8.2K</span>
                </div>
                <div className="w-full bg-stone-800 rounded-full h-2">
                  <div className="bg-red-800 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-white">Winter Collection</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Impressions</span>
                  <span className="text-white font-medium">8.7K</span>
                </div>
                <div className="w-full bg-stone-800 rounded-full h-2">
                  <div className="bg-red-800 h-2 rounded-full" style={{ width: "55%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Engagement</span>
                  <span className="text-white font-medium">5.9K</span>
                </div>
                <div className="w-full bg-stone-800 rounded-full h-2">
                  <div className="bg-red-800 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-white">Accessories Line</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Impressions</span>
                  <span className="text-white font-medium">3.4K</span>
                </div>
                <div className="w-full bg-stone-800 rounded-full h-2">
                  <div className="bg-red-800 h-2 rounded-full" style={{ width: "25%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Engagement</span>
                  <span className="text-white font-medium">2.1K</span>
                </div>
                <div className="w-full bg-stone-800 rounded-full h-2">
                  <div className="bg-red-800 h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
