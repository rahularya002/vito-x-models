"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Top model data type
type TopModel = {
  id: number
  name: string
  image: string
}

// Sample top model data
const topModels: TopModel[] = [
  {
    id: 1,
    name: "JENNY WILSON",
    image: "/images/extra/01.png",
  },
  {
    id: 2,
    name: "RALPH EDWARDS",
    image: "/images/extra/02.png",
  },
  {
    id: 3,
    name: "KRISTIN WATSON",
    image: "/images/extra/03.png",
  },
  {
    id: 4,
    name: "GUY HAWKINS",
    image: "/images/extra/04.png",
  },
  {
    id: 5,
    name: "CAMERON DIAZ",
    image: "/images/extra/05.png",
  },
  {
    id: 6,
    name: "MICHAEL JORDAN",
    image: "/images/extra/06.png",
  },
]

export default function TopModelsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Calculate how many models to show based on viewport
  const modelsToShow = 4
  const totalSlides = Math.ceil(topModels.length / modelsToShow)

  // Navigate to previous slide
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      scrollToIndex(currentIndex - 1)
    }
  }

  // Navigate to next slide
  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1)
      scrollToIndex(currentIndex + 1)
    }
  }

  // Scroll carousel to specific index
  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      })
    }
  }

  // Calculate progress percentage for the progress bar
  const progressPercentage = ((currentIndex + 1) / totalSlides) * 100

  return (
    <section className="w-full bg-stone-100 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-red-800">OUR TOP MODELS</h2>

        <div className="relative overflow-hidden">
          {/* Carousel container */}
          <div ref={carouselRef} className="flex overflow-x-hidden snap-x snap-mandatory">
            {/* Map through models and create slides */}
            {topModels.map((model) => (
              <div
                key={model.id}
                className="relative flex-shrink-0 w-[280px] h-[360px] rounded-3xl overflow-hidden snap-start mr-4"
              >
                {/* Model image */}
                <Image src={model.image || "/placeholder.svg"} alt={model.name} fill className="object-cover" />

                {/* Improved vertical name label */}
                <div className="absolute top-0 left-0 h-full flex items-center">
                  <div className="h-full flex items-center">
                    <div className="relative w-12 h-full bg-gradient-to-r from-black/60 to-transparent">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap origin-center w-[360px]">
                        <p className="text-white text-2xl font-bold tracking-wider translate-x-5">{model.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="mt-6 flex items-center">
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-red-800 flex items-center justify-center text-red-800 mr-2 hover:bg-red-800 hover:text-white transition-colors"
            aria-label="Previous slide"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-red-800 flex items-center justify-center text-red-800 mr-6 hover:bg-red-800 hover:text-white transition-colors"
            aria-label="Next slide"
            disabled={currentIndex === totalSlides - 1}
          >
            <ChevronRight size={20} />
          </button>

          {/* Progress bar */}
          <div className="relative flex-grow h-1 bg-stone-300 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-red-800 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}