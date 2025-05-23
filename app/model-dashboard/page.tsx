import Link from "next/link"
import Image from "next/image"
import { Camera, Calendar, DollarSign, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react"

// Mock data
const modelData = {
  name: "Sophia Williams",
  avatar: "/model-avatar-4.jpg",
  credits: 1500,
  upcomingPhotoshoots: 2,
  completedPhotoshoots: 8,
  joinDate: "2023-07-25",
  lastLogin: "2023-08-15",
  recentActivity: [
    {
      type: "photoshoot_completed",
      brand: "Urban Trends",
      date: "2023-08-10",
      amount: 500,
    },
    {
      type: "photoshoot_scheduled",
      brand: "StyleCo",
      date: "2023-08-20",
    },
    {
      type: "credit_added",
      amount: 750,
      date: "2023-07-15",
      description: "Magazine editorial",
    },
  ],
  upcomingEvents: [
    {
      title: "Summer Collection Photoshoot",
      brand: "StyleCo",
      date: "2023-08-20",
      time: "10:00 AM - 2:00 PM",
      location: "Downtown Studio",
    },
    {
      title: "Fall Catalog Preparation",
      brand: "Fashion Forward",
      date: "2023-09-05",
      time: "9:00 AM - 4:00 PM",
      location: "Riverside Studio",
    },
  ],
}

export default function ModelDashboardPage() {
  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image src={modelData.avatar || "/placeholder.svg"} alt={modelData.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Welcome back, {modelData.name}</h1>
            <p className="text-white/70">Manage your modeling career and track your earnings</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm">Available Credits</p>
                <h3 className="text-3xl font-bold text-white mt-1">${modelData.credits}</h3>
              </div>
              <div className="bg-green-800/20 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/model-dashboard/credits" className="text-red-800 hover:underline text-sm">
                View History
              </Link>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm">Upcoming Photoshoots</p>
                <h3 className="text-3xl font-bold text-white mt-1">{modelData.upcomingPhotoshoots}</h3>
              </div>
              <div className="bg-blue-800/20 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/model-dashboard/photoshoots" className="text-red-800 hover:underline text-sm">
                View Schedule
              </Link>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm">Completed Photoshoots</p>
                <h3 className="text-3xl font-bold text-white mt-1">{modelData.completedPhotoshoots}</h3>
              </div>
              <div className="bg-purple-800/20 p-3 rounded-lg">
                <Camera className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/model-dashboard/photoshoots?filter=completed"
                className="text-red-800 hover:underline text-sm"
              >
                View History
              </Link>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm">Profile Views</p>
                <h3 className="text-3xl font-bold text-white mt-1">142</h3>
              </div>
              <div className="bg-yellow-800/20 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+12% from last month</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="lg:col-span-2 bg-stone-900 rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Upcoming Photoshoots</h2>
              <Link href="/model-dashboard/schedule" className="text-red-800 hover:underline text-sm">
                View All
              </Link>
            </div>

            {modelData.upcomingEvents.length > 0 ? (
              modelData.upcomingEvents.map((event, index) => (
                <div key={index} className="py-4 border-b border-white/10 last:border-none">
                  <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                  <p className="text-white/70 text-sm">{event.brand}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4 text-white/50" />
                    <p className="text-white/70 text-sm">
                      {event.date}, {event.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-white/50" />
                    <p className="text-white/70 text-sm">{event.location}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4">
                <p className="text-white/70">No upcoming photoshoots scheduled.</p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            {modelData.recentActivity.length > 0 ? (
              modelData.recentActivity.map((activity, index) => (
                <div key={index} className="py-4 border-b border-white/10 last:border-none">
                  {activity.type === "photoshoot_completed" && (
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Photoshoot Completed</h3>
                        <p className="text-white/70 text-sm">Brand: {activity.brand}</p>
                        <p className="text-white/70 text-sm">Date: {activity.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-green-500">${activity.amount}</span>
                      </div>
                    </div>
                  )}
                  {activity.type === "photoshoot_scheduled" && (
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Photoshoot Scheduled</h3>
                        <p className="text-white/70 text-sm">Brand: {activity.brand}</p>
                        <p className="text-white/70 text-sm">Date: {activity.date}</p>
                      </div>
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    </div>
                  )}
                  {activity.type === "credit_added" && (
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Credits Added</h3>
                        <p className="text-white/70 text-sm">{activity.description}</p>
                        <p className="text-white/70 text-sm">Date: {activity.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-green-500">${activity.amount}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-4">
                <p className="text-white/70">No recent activity.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
