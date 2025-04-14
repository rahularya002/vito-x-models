"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"

// Model data type
type Model = {
  id: number
  name: string
  image: string
  categories: string[]
}

// Sample model data
const models: Model[] = [
  {
    id: 1,
    name: "Alex Morgan",
    image: "/images/models/Group 4.png",
    categories: ["WOMEN", "FASHION"],
  },
  {
    id: 2,
    name: "James Lee",
    image: "/images/models/Group 5.png",
    categories: ["FASHION", "COMMERCIAL"],
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    image: "/images/models/Group 6.png",
    categories: ["WOMEN", "GLAMOUR"],
  },
  {
    id: 4,
    name: "Cristien Paul",
    image: "/images/models/Group 7.png",
    categories: ["WOMEN", "PETITE"],
  },
  {
    id: 5,
    name: "Marcus Johnson",
    image: "/images/models/Group 8.png",
    categories: ["COMMERCIAL", "FASHION"],
  },
  {
    id: 6,
    name: "Aisha Khan",
    image: "/images/models/Group 9.png",
    categories: ["WOMEN", "GLAMOUR"],
  },
  {
    id: 7,
    name: "Liam Wilson",
    image: "/images/models/Group 10.png",
    categories: ["COMMERCIAL"],
  },
]

// Available categories
const categories = ["ALL", "WOMEN", "FASHION", "PETITE", "COMMERCIAL", "GLAMOUR"]

export default function Models() {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  
  // Filter models based on active category
  const filteredModels =
    activeCategory === "ALL" ? models : models.filter((model) => model.categories.includes(activeCategory))

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            OUR MODELS
          </motion.h2>

          <motion.div 
            className="flex flex-wrap gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`text-sm md:text-base font-medium transition-colors ${
                  activeCategory === category
                    ? "text-white border-b-2 border-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Carousel navigation buttons */}
          <motion.button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 text-white -ml-4 hover:bg-black/70 transition-colors"
            aria-label="Scroll left"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 text-white -mr-4 hover:bg-black/70 transition-colors"
            aria-label="Scroll right"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Carousel container */}
          <motion.div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                className="relative flex-shrink-0 w-[220px] h-[280px] rounded-3xl overflow-hidden snap-start group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7 + index * 0.15, 
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -5 }}
              >
                <Image src={model.image || "/placeholder.svg"} alt={model.name} fill className="object-cover" />
                
                {/* Model name overlay with enhanced animation */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-black/70 py-3 transform translate-y-full group-hover:translate-y-0"
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <p className="text-white text-lg font-medium text-center">{model.name}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}