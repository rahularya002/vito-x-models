"use client"

import { useState } from "react"
import { SupportSidebar } from "@/components/dashboard/SupportSidebar"
import { ContactSupport } from "@/components/dashboard/ContactSupport"
import { FAQ } from "@/components/dashboard/FAQ"
import { LiveChat } from "@/components/dashboard/LiveChat"

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("contact")

  const handleContactSubmit = async (formData: {
    subject: string;
    message: string;
    priority: string;
  }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Support Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <SupportSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === "contact" && (
              <ContactSupport onSubmit={handleContactSubmit} />
            )}

            {activeTab === "faq" && (
              <FAQ />
            )}

            {activeTab === "live" && (
              <LiveChat />
            )}

            {activeTab === "documentation" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Documentation</h2>
                <p className="text-white/70">
                  Our documentation is currently being updated. Please check back soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
