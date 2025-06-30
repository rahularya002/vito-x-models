"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

// Model data type
type Model = {
  id: number
  name: string
  image: string
}

// Sample model data
const models: Model[] = [
  {
    id: 1,
    name: "Alexa Morgan",
    image: "/images/models/Group 4.png",
  },
  {
    id: 2,
    name: "Judy Lee",
    image: "/images/models/Group 5.png",
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    image: "/images/models/Group 6.png",
  },
  {
    id: 4,
    name: "Cristien Paul",
    image: "/images/models/Group 7.png",
  },
  {
    id: 5,
    name: "Marcus Johnson",
    image: "/images/models/Group 8.png",
  },
  {
    id: 6,
    name: "suev",
    image: "/images/models/Group 9.png",
  },
  {
    id: 7,
    name: "Liam Wilson",
    image: "/images/models/Group 10.png",
  },
]

export default function Models() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  // Scroll carousel left
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  // Scroll carousel right
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <motion.section 
      ref={sectionRef}
      className="w-full bg-black text-white py-12 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          AI MODELS
        </motion.h2>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Carousel navigation buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 text-white -ml-4 hover:bg-black/70 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 text-white -mr-4 hover:bg-black/70 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel container */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                className="relative flex-shrink-0 w-[220px] h-[280px] rounded-3xl overflow-hidden snap-start group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7 + index * 0.15
                }}
              >
                <Image src={model.image || "/placeholder.svg"} alt={model.name} fill className="object-cover" />
                
                {/* Model name overlay */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-black/70 py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                >
                  <p className="text-white text-lg font-medium text-center">{model.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}