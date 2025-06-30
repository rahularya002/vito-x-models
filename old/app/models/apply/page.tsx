"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Instagram, Mail, Phone, User } from "lucide-react"
import { useState, useEffect } from "react"

export default function ModelApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    preferredName: "",
    gender: "",
    dob: "",
    cityState: "",
    phone: "",
    email: "",
    instagram: "",
  })
  const [ageError, setAgeError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [models, setModels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear age error when date changes
    if (name === "dob") {
      setAgeError(false)
    }
  }

  const calculateAge = (birthdate: string): number => {
    const today = new Date()
    const birthDate = new Date(birthdate)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Check if model is at least 18 years old
    const age = calculateAge(formData.dob)

    if (age < 18) {
      setAgeError(true)
      setSubmitting(false)
      return
    }

    // Form would be submitted here
    console.log("Form submitted:", formData)

    // Reset form after submission (in real app, you'd redirect to success page)
    setTimeout(() => {
      setSubmitting(false)
      // Reset form or redirect
    }, 1000)
  }

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch('/api/models')
        if (!res.ok) throw new Error('Failed to fetch models')
        const data = await res.json()
        setModels(data)
      } catch (err) {
        setError('Failed to load models')
      } finally {
        setLoading(false)
      }
    }
    fetchModels()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full">
        <Image
          src="/model-apply-hero.jpg"
          alt="Model Application"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Model Application</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Join our exclusive roster of fashion models and work with top brands worldwide
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left Column - Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Join Our Roster</h2>
              <p className="text-gray-300 mb-6">
                We're always looking for fresh faces and experienced models to join our exclusive roster. Fill out the
                form to start your journey with us.
              </p>
            </div>

            {/* <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-500" />
                <span>models@fashionagency.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-red-500" />
                <span>@fashionagency</span>
              </div>
            </div> */}

            <div className="pt-6">
              <p className="text-sm text-gray-400">
                After submitting your application, our team will review your information and get back to you within 5-7
                business days.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <strong>Note:</strong> Applicants must be at least 18 years of age to be considered.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="md:col-span-3">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <User className="h-4 w-4" /> Full Name*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="preferredName" className="block text-sm font-medium mb-1">
                    Preferred Name (if different)
                  </label>
                  <input
                    type="text"
                    id="preferredName"
                    name="preferredName"
                    value={formData.preferredName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Gender*</label>
                  <div className="flex gap-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                        required
                        className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-700 bg-gray-900"
                      />
                      <label htmlFor="male" className="ml-2">
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                        className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-700 bg-gray-900"
                      />
                      <label htmlFor="female" className="ml-2">
                        Female
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="other"
                        name="gender"
                        value="other"
                        checked={formData.gender === "other"}
                        onChange={handleChange}
                        className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-700 bg-gray-900"
                      />
                      <label htmlFor="other" className="ml-2">
                        Other
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Date of Birth*
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 bg-gray-900 border ${
                      ageError ? "border-red-500" : "border-gray-700"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                  />
                  {ageError && <p className="text-red-500 text-sm mt-1">You must be at least 18 years old to apply.</p>}
                </div>

                <div>
                  <label htmlFor="cityState" className="block text-sm font-medium mb-1 flex items-center gap-2">
                    City & State*
                  </label>
                  <input
                    type="text"
                    id="cityState"
                    name="cityState"
                    value={formData.cityState}
                    onChange={handleChange}
                    required
                    placeholder="e.g. New York, NY"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone Number (WhatsApp)*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <Instagram className="h-4 w-4" /> Instagram Handle*
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">@</span>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      required
                      className="w-full pl-8 px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md transition duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center pt-2">
                By submitting this form, you agree to our{" "}
                <Link href="#" className="text-red-400 hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-red-400 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
