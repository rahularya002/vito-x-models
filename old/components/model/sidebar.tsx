"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, User, Camera, DollarSign, Calendar, Settings, HelpCircle, LogOut } from "lucide-react"

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/model-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Profile",
    href: "/model-dashboard/profile",
    icon: User,
  },
  {
    name: "Photoshoots",
    href: "/model-dashboard/photoshoots",
    icon: Camera,
  },
  {
    name: "Credits",
    href: "/model-dashboard/credits",
    icon: DollarSign,
  },
  {
    name: "Schedule",
    href: "/model-dashboard/schedule",
    icon: Calendar,
  },
  {
    name: "Settings",
    href: "/model-dashboard/settings",
    icon: Settings,
  },
  {
    name: "Help & Support",
    href: "/model-dashboard/support",
    icon: HelpCircle,
  },
]

export function ModelSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-stone-900 h-full flex flex-col border-r border-white/10">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">Model Dashboard</h2>
        <p className="text-white/60 text-sm">Manage your modeling career</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-red-800 text-white" : "text-white/70 hover:bg-stone-800 hover:text-white"
              }`}
            >
              <link.icon className="h-5 w-5 mr-3" />
              {link.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <Link
          href="/"
          className="flex items-center px-4 py-3 text-white/70 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Link>
      </div>
    </div>
  )
}
