"use client"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function VideoHeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const currentRef = headingRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-text")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/final-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="mb-6 inline-flex items-center px-4 py-2 border border-white/20 bg-black/20 backdrop-blur-sm rounded-full text-sm text-white shadow-sm">
            <span className="text-primary font-bold mr-2">VB</span> AI-Powered Creative Studio
          </div>
          
          <h1
            ref={headingRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white"
          >
            <span className="block reveal-text">Visionary</span>
            <span className="block reveal-text text-primary" style={{ animationDelay: "0.2s" }}>
              storytelling
            </span>
            <span className="block reveal-text" style={{ animationDelay: "0.4s" }}>
              reimagined
            </span>
          </h1>

          <p className="text-xl text-white/80 mb-10 max-w-md mx-auto leading-relaxed">
            Where artificial intelligence meets creative filmmaking to transform your brand&apos;s narrative.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://enbquantum.co.in/services">
              <Button 
                size="lg" 
                className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white"
              >
                Get Started
              </Button>
            </Link>
            <Link href="https://enbquantum.co.in/services">
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-white"
              >
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 