import type React from "react"
import { ModelSidebar } from "@/components/model/sidebar"

export default function ModelDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-black">
      <ModelSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
