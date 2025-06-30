'use client'

import { useState } from "react"
import { ContactHero } from "@/components/contact/ContactHero"
import { ContactForm } from "@/components/contact/ContactForm"
import { CollaborationOpportunities } from "@/components/contact/CollaborationOpportunities"

export default function ContactPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    company: string;
    project: string;
    message: string;
  }) => {
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
      } else {
        throw new Error(data.error || "Submission failed")
      }
    } catch (err) {
      throw err
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <ContactHero />
      
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
          <ContactForm onSubmit={handleSubmit} />
          <CollaborationOpportunities />
        </div>
      </section>
    </main>
  )
}