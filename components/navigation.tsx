"use client"

import { useState } from "react"
import { Sparkles, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative z-50 px-6 py-4 border-b border-red-100 bg-white/80 backdrop-blur-sm top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-red-800">Visionary</span>
            <span className="text-red-600">Brothers</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-red-700 hover:text-red-600 font-medium transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-red-700 hover:text-red-600 font-medium transition-colors">
            Services
          </Link>
          <Link href="/blog" className="text-red-700 hover:text-red-600 font-medium transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="text-red-700 hover:text-red-600 font-medium transition-colors">
            Contact
          </Link>
          <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium">
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="bg-white/80 backdrop-blur-sm border border-red-200 px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-red-100 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/"
              className="block text-red-700 hover:text-red-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block text-red-700 hover:text-red-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="block text-red-700 hover:text-red-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block text-red-700 hover:text-red-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-4 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
