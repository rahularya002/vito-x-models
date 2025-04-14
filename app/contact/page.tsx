'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [projectType, setProjectType] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Validate required fields
    if (!name || !email || !message) {
      setError("Please fill in all required fields.")
      setIsSubmitting(false)
      return
    }

    const formData = {
      name,
      email,
      company,
      project: projectType,
      message
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Submission failed")
      }

      const data = await response.json()
      if (data.success) {
        setSubmitSuccess(true)
        // Reset form fields
        setName("")
        setEmail("")
        setCompany("")
        setProjectType("")
        setMessage("")
      } else {
        throw new Error(data.error || "Submission failed")
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <Image src="/images/extra/09.png" alt="Contact us" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">PROMOTE WITH US</h1>
            <Link
              href="/"
              className="bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition text-sm md:text-base"
            >
              Home →
            </Link>
          </div>
          <p className="text-xl md:text-2xl max-w-2xl text-white/80">
            Elevate your brand with our exceptional talent and creative expertise
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-red-800">GET IN TOUCH</h2>
            {error && (
              <div className="mb-4 p-4 bg-red-800/20 text-red-300 rounded-lg">
                {error}
              </div>
            )}
            {submitSuccess && (
              <div className="mb-4 p-4 bg-green-800/20 text-green-300 rounded-lg">
                Thank you! Your inquiry has been submitted successfully.
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">Company / Brand</label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                  placeholder="Your company or brand name"
                />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium mb-2">Project Type</label>
                <select
                  id="project"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white appearance-none"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                >
                  <option value="" disabled className="bg-gray-800 text-white">Select project type</option>
                  <option value="fashion" className="bg-gray-800 text-white">Fashion Campaign</option>
                  <option value="product" className="bg-gray-800 text-white">Product Promotion</option>
                  <option value="event" className="bg-gray-800 text-white">Event or Show</option>
                  <option value="commercial" className="bg-gray-800 text-white">Commercial Shoot</option>
                  <option value="editorial" className="bg-gray-800 text-white">Editorial</option>
                  <option value="other" className="bg-gray-800 text-white">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                  placeholder="Tell us about your product and promotion goals..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-red-800 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          </div>

          {/* Right Column - Info */}
          <div className="mt-12 md:mt-0">
            <h2 className="text-3xl font-bold mb-8 text-red-800">COLLABORATION OPPORTUNITIES</h2>
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Product Campaigns</h3>
                <p className="text-white/80 mb-4">
                  Showcase your products with our diverse roster of models. From fashion and accessories to lifestyle
                  products, our talent can help your brand connect with your target audience.
                </p>
                <Link href="#" className="text-red-800 font-medium hover:underline">
                  View our campaign portfolio →
                </Link>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Brand Ambassadors</h3>
                <p className="text-white/80 mb-4">
                  Partner with our models for long-term brand ambassador relationships. Build authentic connections with
                  consumers through consistent representation by our professional talent.
                </p>
                <Link href="#" className="text-red-800 font-medium hover:underline">
                  Meet our brand ambassadors →
                </Link>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Digital & Social Media</h3>
                <p className="text-white/80 mb-4">
                  Leverage our models social media presence and digital reach to promote your products to engaged
                  audiences. Perfect for product launches and digital marketing campaigns.
                </p>
                <Link href="#" className="text-red-800 font-medium hover:underline">
                  Explore digital opportunities →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}