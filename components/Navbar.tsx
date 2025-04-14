"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Image */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image 
                src="/images/logo/logo black.png" // Update with your logo path
                alt="VB MODELS Logo"
                width={120} // Adjust width as needed
                height={40} // Adjust height as needed
                className="cursor-pointer"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {["our models", "talents", "about us", "news & articles"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.replace(/\s+&\s+|\s+/g, "-").toLowerCase()}`}
                    className="uppercase text-sm font-medium tracking-wide hover:text-red-800 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Button */}
          <div className="hidden md:block">
            <Link href={'/contact'}> 
              <button className="bg-red-800 hover:bg-red-900 rounded-full py-2 px-6 text-white font-medium text-sm tracking-wide transition-all duration-300 transform hover:scale-105 shadow-sm">
                Contact Us
              </button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <ul className="flex flex-col space-y-4">
              {["our models", "talents", "about us", "news & articles"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.replace(/\s+&\s+|\s+/g, "-").toLowerCase()}`}
                    className="uppercase text-sm font-medium tracking-wide block py-2 hover:text-red-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={'/contact'}>
            <button className="w-full bg-red-800 hover:bg-red-900 rounded-full py-2 px-6 text-white font-medium text-sm tracking-wide transition-colors">
              Contact Us
            </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
