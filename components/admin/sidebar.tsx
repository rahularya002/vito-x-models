"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Users, Settings, LogOut, UserRound, ShoppingBag } from "lucide-react"
import { signOut } from "next-auth/react"

const sidebarLinks = [
  {
    name: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Product Requests",
    href: "/admin/product-requests",
    icon: ShoppingBag,
  },
  {
    name: "Models",
    href: "/admin/models",
    icon: UserRound,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/admin/login")
  }

  return (
    <div className="w-64 bg-stone-900 h-full flex flex-col border-r border-white/10">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        <p className="text-white/60 text-sm">Manage users and requests</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

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
          className="flex items-center px-4 py-3 text-white/70 hover:text-white rounded-lg hover:bg-stone-800 transition-colors w-full"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Exit Admin
        </button>
      </div>
    </div>
  )
}
