"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Instagram, Mail, MapPin, Phone, User } from "lucide-react"

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: string;
  cityState: string;
  phone: string;
  instagramHandle: string;
}

export default function ModelSignupPage() {
  // Form state
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    cityState: "",
    phone: "",
    instagramHandle: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  // Update handleChange to handle both input and textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    if (name === "dateOfBirth") {
      const age = calculateAge(value)
      if (age < 18) {
        setErrors({ ...errors, dateOfBirth: "You must be at least 18 years old to apply" })
      } else {
        const newErrors = { ...errors }
        delete newErrors.dateOfBirth
        setErrors(newErrors)
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Validate current step
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
      if (!formData.password) {
        newErrors.password = "Password is required"
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      }
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    } else if (currentStep === 2) {
      if (!formData.gender) {
        newErrors.gender = "Please select your gender"
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of birth is required"
      } else {
        const age = calculateAge(formData.dateOfBirth)
        if (age < 18) {
          newErrors.dateOfBirth = "You must be at least 18 years old to apply"
        }
      }
    } else if (currentStep === 3) {
      if (!formData.cityState.trim()) {
        newErrors.cityState = "City & State is required"
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number"
      }
      if (!formData.instagramHandle.trim()) {
        newErrors.instagramHandle = "Instagram handle is required"
      } else if (!formData.instagramHandle.startsWith("@")) {
        newErrors.instagramHandle = "Instagram handle must start with @"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle next step
  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateStep(step)) {
      setIsSubmitting(true)

      try {
        const response = await fetch('/api/models/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Something went wrong')
        }

        setIsSubmitted(true)
      } catch (error) {
        console.error('Error submitting form:', error)
        setErrors({
          submit: error instanceof Error ? error.message : 'Failed to submit application',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Render success message after submission
  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-black text-white pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-stone-900 rounded-2xl overflow-hidden shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Thank you for applying to join our modeling team. We'll review your application and get back to you soon.
            </p>
            <div className="bg-stone-800 rounded-lg p-6 mb-8 max-w-md mx-auto">
              <h2 className="font-bold mb-4">What happens next?</h2>
              <ol className="text-left space-y-3 text-white/70">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-800/20 text-red-800 flex items-center justify-center">
                    1
                  </span>
                  <span>Our team will review your application (1-3 business days)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-800/20 text-red-800 flex items-center justify-center">
                    2
                  </span>
                  <span>You'll receive an email notification about your application status</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-800/20 text-red-800 flex items-center justify-center">
                    3
                  </span>
                  <span>If approved, you can log in to your model dashboard</span>
                </li>
              </ol>
            </div>
            <Link
              href="/"
              className="inline-block bg-red-800 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-stone-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            {/* Left Column - Form */}
            <div className="p-8 md:p-12">
              <h1 className="text-3xl font-bold mb-2">Model Application</h1>
              <p className="text-white/70 mb-8">Join our exclusive modeling network</p>

              {/* Progress Steps */}
              <div className="flex mb-8">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                        step === stepNumber
                          ? "bg-red-800 text-white"
                          : step > stepNumber
                            ? "bg-green-600 text-white"
                            : "bg-stone-800 text-white/50"
                      }`}
                    >
                      {step > stepNumber ? <Check className="w-4 h-4" /> : stepNumber}
                    </div>
                    <div
                      className={`h-1 w-full ${stepNumber < 3 ? "block" : "hidden"} ${
                        step > stepNumber ? "bg-green-600" : "bg-stone-800"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <>
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pl-10 bg-black/30 border ${
                            errors.fullName ? "border-red-500" : "border-white/10"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white`}
                          placeholder="Your full name"
                        />
                      </div>
                      {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pl-10 bg-black/30 border ${
                            errors.email ? "border-red-500" : "border-white/10"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white`}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-black/30 border ${
                            errors.password ? "border-red-500" : "border-white/10"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white pr-10`}
                          placeholder="Create a password"
                          minLength={8}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                      <p className="text-xs text-white/50 mt-1">Must be at least 8 characters</p>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-black/30 border ${
                            errors.confirmPassword ? "border-red-500" : "border-white/10"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white pr-10`}
                          placeholder="Confirm your password"
                        />
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                    </div>
                  </>
                )}

                {/* Step 2: Personal Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Gender</label>
                      <div className="flex space-x-4">
                        {["Male", "Female", "Other"].map((option) => (
                          <label key={option} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value={option.toLowerCase()}
                              checked={formData.gender.toLowerCase() === option.toLowerCase()}
                              onChange={handleChange}
                              className="h-4 w-4 rounded border-white/30 bg-black/30 text-red-800 focus:ring-red-800"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                      {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                    </div>

                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]} // Prevent future dates
                        className={`w-full px-4 py-3 bg-black/30 border ${
                          errors.dateOfBirth ? "border-red-500" : "border-white/10"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white`}
                      />
                      {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                      <p className="text-xs text-white/50 mt-1">You must be at least 18 years old to apply</p>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Information */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="cityState" className="block text-sm font-medium mb-2">
                        City & State
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                        <input
                          type="text"
                          id="cityState"
                          name="cityState"
                          value={formData.cityState}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pl-10 bg-black/30 border ${
                            errors.cityState ? "border-red-500" : "border-white/10"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white`}
                          placeholder="New York, NY"
                        />
                      </div>
                      {errors.cityState && <p className="mt-1 text-sm text-red-500">{errors.cityState}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number (WhatsApp)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pl-10 bg-black/30 border ${
                            errors.phone ? "border-red-500" : "border-white/10"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="instagramHandle" className="block text-sm font-medium mb-2">
                        Instagram Handle
                      </label>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                        <input
                          type="text"
                          id="instagramHandle"
                          name="instagramHandle"
                          value={formData.instagramHandle}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pl-10 bg-black/30 border ${
                            errors.instagramHandle ? "border-red-500" : "border-white/10"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white`}
                          placeholder="@yourusername"
                        />
                      </div>
                      {errors.instagramHandle && <p className="mt-1 text-sm text-red-500">{errors.instagramHandle}</p>}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center gap-2 py-2 px-4 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center gap-2 py-2 px-4 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 py-2 px-6 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  )}
                </div>
              </form>

              <p className="mt-6 text-center text-white/70">
                Already have an account?{" "}
                <Link href="/login" className="text-red-800 hover:underline">
                  Log in
                </Link>
              </p>
            </div>

            {/* Right Column - Image and Benefits */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
              <Image src="/model-apply-hero.jpg" alt="Model photoshoot" fill className="object-cover" />
              <div className="absolute inset-0 z-20 p-12 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-6">Join Our Model Network</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-800 flex items-center justify-center mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="ml-3 text-white/90">Work with top fashion brands</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-800 flex items-center justify-center mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="ml-3 text-white/90">Build your professional portfolio</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-800 flex items-center justify-center mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="ml-3 text-white/90">Earn competitive rates</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-800 flex items-center justify-center mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="ml-3 text-white/90">Access exclusive industry opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
