"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
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
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80 -z-10" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center px-4 py-2 border border-border/50 bg-background/50 backdrop-blur-sm rounded-full text-sm shadow-sm">
              <span className="text-primary font-bold mr-2">VB</span> AI-Powered Creative Studio
            </div>
            <h1
              ref={headingRef}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              <span className="block reveal-text bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Visionary</span>
              <span className="block reveal-text text-primary" style={{ animationDelay: "0.2s" }}>
                storytelling
              </span>
              <span className="block reveal-text bg-clip-text text-transparent bg-gradient-to-r from-foreground/80 to-foreground/60" style={{ animationDelay: "0.4s" }}>
                reimagined
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-md leading-relaxed">
              Where artificial intelligence meets creative filmmaking to transform your brand&apos;s narrative.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://enbquantum.co.in/services">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 bg-primary hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="https://enbquantum.co.in/services">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <Image
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop"
                alt="AI-powered creative technology"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-lg">
              <div>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">250+</p>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-lg">
              <div>
                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">99%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
