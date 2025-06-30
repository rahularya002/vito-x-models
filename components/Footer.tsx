"use client"

import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-900 to-red-800 text-white py-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl font-bold">
                <span className="text-white">Visionary</span>
                <span className="text-red-300">Brothers</span>
              </h3>
            </div>
            <p className="text-red-200 mb-6">
              Revolutionizing commercial experiences with AI-powered creativity and cinematic storytelling.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <span className="text-white">📱</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <span className="text-white">💼</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <span className="text-white">📸</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <span className="text-white">🎬</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-red-200 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {[
                "AI Commercial Ads",
                "Short Films",
                "Brand Storytelling",
                "Visual Effects",
                "Animation",
                "Consultation",
              ].map((service, i) => (
                <li key={i}>
                  <Link
                    href="/services"
                    className="text-red-200 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" /> {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
            <p className="text-red-200 mb-4">Subscribe to our newsletter for the latest updates and insights.</p>
            <form className="space-y-3">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-red-700/50 border border-red-600 text-white placeholder-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all outline-none"
                placeholder="Your email address"
              />
              <button className="w-full bg-white text-red-600 hover:bg-red-100 py-3 font-semibold rounded-lg transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-red-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-red-300 text-center md:text-left">© 2025 Visionary Brothers. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="text-red-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-red-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-red-300 hover:text-white transition-colors">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
