"use client"

import { useState } from "react"
import { MessageSquare, FileQuestion, Book, LifeBuoy, Send } from 'lucide-react'

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("contact")
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    priority: "normal",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        subject: "",
        message: "",
        priority: "normal",
      })
    }, 3000)
  }

  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Support Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-stone-900 rounded-xl p-4 border border-white/10">
              <div className="flex flex-col space-y-1">
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "contact"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("contact")}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact Support
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "faq"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("faq")}
                >
                  <FileQuestion className="h-5 w-5 mr-2" />
                  FAQ
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "documentation"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("documentation")}
                >
                  <Book className="h-5 w-5 mr-2" />
                  Documentation
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "live"
                      ? "bg-red-800 text-white"
                      : "text-white/70 hover:bg-stone-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("live")}
                >
                  <LifeBuoy className="h-5 w-5 mr-2" />
                  Live Chat
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Contact Support Tab */}
            {activeTab === "contact" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Contact Support</h2>

                {submitted ? (
                  <div className="bg-green-900/30 border border-green-800 rounded-lg p-4 mb-6">
                    <p className="text-white">Your support request has been submitted. We'll get back to you soon!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-white mb-1">
                          Priority
                        </label>
                        <select
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50 flex items-center"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                        {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === "faq" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>

                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-lg font-medium text-white mb-2">How do I create a new campaign?</h3>
                    <p className="text-white/70">
                      To create a new campaign, navigate to the Campaigns section in your dashboard and click on the "New Campaign" button. Follow the step-by-step wizard to set up your campaign details, select models, and upload your products.
                    </p>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-lg font-medium text-white mb-2">How are models selected for my products?</h3>
                    <p className="text-white/70">
                      Models are matched to your products based on several factors including their specialty, availability, and your campaign requirements. You can also manually select specific models from our catalog for your campaigns.
                    </p>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-lg font-medium text-white mb-2">What file formats are supported for product uploads?</h3>
                    <p className="text-white/70">
                      We support JPG, PNG, and WebP formats for product images. For the best results, we recommend high-resolution images (at least 1200x1200 pixels) with a clean background.
                    </p>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-lg font-medium text-white mb-2">How do I track the performance of my campaigns?</h3>
                    <p className="text-white/70">
                      You can track campaign performance in the Analytics section of your dashboard. We provide metrics such as impressions, clicks, engagement rates, and conversion data for each of your active campaigns.
                    </p>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-lg font-medium text-white mb-2">What payment methods do you accept?</h3>
                    <p className="text-white/70">
                      We accept all major credit cards (Visa, Mastercard, American Express), as well as PayPal and bank transfers for enterprise accounts. All payments are processed securely through our payment gateway.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">How can I upgrade or downgrade my subscription?</h3>
                    <p className="text-white/70">
                      You can change your subscription plan at any time by going to the Billing section in your account settings. Changes to your subscription will take effect at the start of your next billing cycle.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Documentation Tab */}
            {activeTab === "documentation" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Documentation</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-stone-800 p-4 rounded-lg border border-white/10 hover:border-red-500 transition-colors">
                      <h3 className="text-lg font-medium text-white mb-2">Getting Started Guide</h3>
                      <p className="text-white/70 mb-4">Learn the basics of our platform and how to set up your first campaign.</p>
                      <a href="#" className="text-red-400 hover:text-red-300 font-medium">Read Guide →</a>
                    </div>

                    <div className="bg-stone-800 p-4 rounded-lg border border-white/10 hover:border-red-500 transition-colors">
                      <h3 className="text-lg font-medium text-white mb-2">Product Upload Guidelines</h3>
                      <p className="text-white/70 mb-4">Best practices for preparing and uploading your product images.</p>
                      <a href="#" className="text-red-400 hover:text-red-300 font-medium">Read Guide →</a>
                    </div>

                    <div className="bg-stone-800 p-4 rounded-lg border border-white/10 hover:border-red-500 transition-colors">
                      <h3 className="text-lg font-medium text-white mb-2">Campaign Management</h3>
                      <p className="text-white/70 mb-4">Learn how to create, edit, and optimize your marketing campaigns.</p>
                      <a href="#" className="text-red-400 hover:text-red-300 font-medium">Read Guide →</a>
                    </div>

                    <div className="bg-stone-800 p-4 rounded-lg border border-white/10 hover:border-red-500 transition-colors">
                      <h3 className="text-lg font-medium text-white mb-2">Analytics & Reporting</h3>
                      <p className="text-white/70 mb-4">Understand how to interpret and leverage your campaign analytics data.</p>
                      <a href="#" className="text-red-400 hover:text-red-300 font-medium">Read Guide →</a>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-white mb-4">API Documentation</h3>
                    <p className="text-white/70 mb-4">
                      For developers looking to integrate with our platform, we provide comprehensive API documentation.
                    </p>
                    <div className="bg-stone-800 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-white">REST API v2.0</h4>
                          <p className="text-white/70 text-sm">Latest stable version of our API</p>
                        </div>
                        <a href="#" className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm">
                          View Docs
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-white mb-4">Video Tutorials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-stone-800 p-4 rounded-lg border border-white/10">
                        <div className="aspect-video bg-stone-700 rounded-lg mb-3"></div>
                        <h4 className="font-medium text-white mb-1">Platform Overview</h4>
                        <p className="text-white/70 text-sm">A complete tour of our platform features</p>
                      </div>
                      <div className="bg-stone-800 p-4 rounded-lg border border-white/10">
                        <div className="aspect-video bg-stone-700 rounded-lg mb-3"></div>
                        <h4 className="font-medium text-white mb-1">Creating Your First Campaign</h4>
                        <p className="text-white/70 text-sm">Step-by-step guide to launching campaigns</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Live Chat Tab */}
            {activeTab === "live" && (
              <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Live Chat Support</h2>

                <div className="bg-stone-800 rounded-lg p-4 border border-white/10 mb-6">
                  <p className="text-white mb-4">
                    Our live chat support is available Monday through Friday, 9:00 AM to 6:00 PM EST.
                  </p>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <p className="text-white">Support agents are currently online</p>
                  </div>
                </div>

                <div className="bg-stone-800 rounded-lg border border-white/10 h-96 flex flex-col">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="font-medium text-white">Chat with Support</h3>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-700 flex items-center justify-center text-white font-medium mr-2">
                          S
                        </div>
                        <div className="bg-stone-700 rounded-lg p-3 max-w-[80%]">
                          <p className="text-white">Hello! How can I help you today?</p>
                          <p className="text-white/50 text-xs mt-1">10:30 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-white/10">
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 bg-stone-700 border border-stone-600 rounded-l-lg text-white focus:outline-none"
                      />
                      <button className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-r-lg">
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
