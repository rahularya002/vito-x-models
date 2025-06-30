"use client"

import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith("/admin/login") || pathname?.startsWith("/admin/signup")

  if (isAuthPage) {
    return <div className="min-h-screen bg-stone-900">{children}</div>
  }

  return (
    <div className="flex h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-6">{children}</div>
    </div>
  )
}
