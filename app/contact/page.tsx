"use client"

import { MapPin, Mail, Phone, Clock, Send } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Get in touch with our team to discuss your next AI-powered commercial project.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-red-100">
            <h2 className="text-2xl font-bold text-red-800 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-red-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none text-black"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-red-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none text-black"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-red-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none text-black"
                    placeholder="Your email address"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-red-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none text-black"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-red-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none text-black"
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-red-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none resize-none text-black"
                  placeholder="Your message"
                ></textarea>
              </div>

              <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" /> Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-red-100">
              <h2 className="text-2xl font-bold text-red-800 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Our Location</h3>
                    <p className="text-red-600/80">
                      123 Creative Avenue
                      <br />
                      Innovation City, IC 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Email Us</h3>
                    <p className="text-red-600/80">
                      info@visionarybrothers.com
                      <br />
                      support@visionarybrothers.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Call Us</h3>
                    <p className="text-red-600/80">
                      +1 (555) 123-4567
                      <br />
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Business Hours</h3>
                    <p className="text-red-600/80">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-red-100">
              <h2 className="text-2xl font-bold text-red-800 mb-6">Frequently Asked Questions</h2>

              <div className="space-y-6">
                {[
                  {
                    question: "How long does a typical project take?",
                    answer:
                      "Most AI-powered commercial projects are completed within 2-4 weeks, depending on complexity and revisions.",
                  },
                  {
                    question: "What is the typical budget range?",
                    answer:
                      "Our projects typically range from $5,000 to $50,000 depending on scope, length, and complexity.",
                  },
                  {
                    question: "Do you offer revisions?",
                    answer:
                      "Yes, all our packages include 2-3 rounds of revisions to ensure your complete satisfaction.",
                  },
                ].map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-red-800 mb-1">{faq.question}</h3>
                    <p className="text-red-600/80">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
