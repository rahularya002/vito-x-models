"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

export default function FooterWithLogo() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribing email:", email)
    setEmail("")
  }

  return (
    <footer className="bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top section with logo and navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="inline-block">
              <Image 
                src="/images/logo/logo white.png" // Update with your actual logo path
                alt="VB MODELS Logo"
                width={120} 
                height={50} 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                { name: "OUR MODELS", path: "#our-models" },
                { name: "OUR BRANDS", path: "#our-brands" },
                { name: "ABOUT US", path: "#about-us" },
                { name: "SOCIAL PLATFORMS", path: "#instagram" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-sm md:text-base hover:text-red-500 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(link.path.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
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
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, index) => (
                <Link
                  key={index}
                  href="#" 
                  aria-label={Icon.name}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-400">©2023 VB MODELS. All Rights Reserved</div>
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
