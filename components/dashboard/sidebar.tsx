"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Users, FileText, BarChart3, Settings, HelpCircle, LogOut } from "lucide-react"
import { useState } from "react"

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Products",
    href: "/dashboard/products",
    icon: ShoppingBag,
  },
  {
    name: "Campaigns",
    href: "/dashboard/campaigns",
    icon: FileText,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Help & Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      
      // Call the logout API route
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // If logout was successful, redirect to home page
        router.push('/')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="w-64 bg-stone-900 h-full flex flex-col border-r border-white/10">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">Brand Dashboard</h2>
        <p className="text-white/60 text-sm">Manage your product promotions</p>
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
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center px-4 py-3 text-white/70 hover:text-white rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          <LogOut className="h-5 w-5 mr-3" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  )
}