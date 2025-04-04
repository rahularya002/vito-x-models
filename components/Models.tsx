"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
    <section className="w-full bg-black text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-0">OUR MODELS</h2>

          <div className="flex flex-wrap gap-4 md:gap-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`text-sm md:text-base font-medium transition-colors ${
                  activeCategory === category
                    ? "text-white border-b-2 border-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
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
            {filteredModels.map((model) => (
              <div
                key={model.id}
                className="relative flex-shrink-0 w-[220px] h-[280px] rounded-3xl overflow-hidden snap-start group"
              >
                <Image src={model.image || "/placeholder.svg"} alt={model.name} fill className="object-cover" />
                
                {/* Model name overlay that shows on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-3 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-white text-lg font-medium text-center">{model.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}