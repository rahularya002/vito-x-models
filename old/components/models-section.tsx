"use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ModelsSection() {
  return (
    <section id="models" className="py-20 md:py-32 bg-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80 -z-10" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Product Promotions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore Visionary Brothers&apos; dedicated platform for product promotions featuring professional models.
            </p>
          </div>

          <div className="flex justify-center mb-16">
            <Link href="/view-models">
              <Button 
                variant="outline" 
                className="rounded-full group inline-flex items-center gap-2 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Visit Models Platform
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/50 group">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
                alt="Product showcase with modern technology"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/50 group">
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop"
                alt="Fashion product presentation"
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/50 group">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=400&auto=format&fit=crop"
                alt="Lifestyle product showcase"
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="mt-8 p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to showcase your products?</h3>
                <p className="text-muted-foreground">Professional models and cutting-edge AI technology by VB</p>
              </div>
              <Link href="/view-models">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                  Explore All Models
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
