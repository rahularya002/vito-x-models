"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

export default function FooterWithLogo() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    // Reset form
    setEmail("")
    // You would typically send this to your API
  }

  return (
    <footer className="bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top section with logo and navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="inline-block">
              <svg
                width="120"
                height="50"
                viewBox="0 0 120 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-auto"
              >
                <path d="M73 25 A25 25 0 1 0 73 24 Z" fill="white" />
                <path d="M110 25 A25 25 0 1 0 110 24 Z" fill="white" />
                <path d="M91.5 12.5 A12.5 12.5 0 1 0 91.5 12.4 Z" fill="#c41e1e" />
              </svg>
            </Link>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
              <li>
                <Link href="/models" className="text-sm md:text-base hover:text-red-500 transition-colors">
                  OUR MODELS
                </Link>
              </li>
              <li>
                <Link href="/talents" className="text-sm md:text-base hover:text-red-500 transition-colors">
                  TALENTS
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm md:text-base hover:text-red-500 transition-colors">
                  ABOUT ME
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm md:text-base hover:text-red-500 transition-colors">
                  NEWS & ARTICLES
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom section with social and newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social and copyright */}
          <div className="mb-6 md:mb-0">
            {/* Social icons */}
            <div className="flex gap-4 mb-4">
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-white hover:text-red-500 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-white hover:text-red-500 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-white hover:text-red-500 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-white hover:text-red-500 transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-400">©2023 morkstudio. All Right Reserved</div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-center md:text-right">SUBSCRIBE TO OUR NEWSLETTER</h3>
            <form onSubmit={handleSubmit} className="flex">
              <div className="relative flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 bg-[#2a1a1a] rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-800 px-4 py-3 rounded-r-md transition-colors"
                aria-label="Subscribe"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

