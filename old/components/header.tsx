"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 100
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex items-center"
          >
            <Image
              src="/vb.png"
              alt="Visionary Brothers"
              width={300}
              height={125}
              className="h-32 w-auto"
              priority
            />
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Button
              variant="ghost"
              className="relative text-foreground hover:text-primary hover:bg-transparent transition-colors group"
              onClick={() => scrollToSection("services")}
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Button>
            <Button
              variant="ghost"
              className="relative text-foreground hover:text-primary hover:bg-transparent transition-colors group"
              onClick={() => scrollToSection("portfolio")}
            >
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Button>
            <Button
              variant="ghost"
              className="relative text-foreground hover:text-primary hover:bg-transparent transition-colors group"
              onClick={() => scrollToSection("models")}
            >
              Models
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Button>
          </nav>

          {/* CTA Button */}
          <Button
            className="relative rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 group overflow-hidden"
            onClick={() => scrollToSection("contact")}
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
