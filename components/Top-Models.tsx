"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

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
    name: "ARJUN MEHRA",
    image: "/images/extra/01.png",
  },
  {
    id: 2,
    name: "RAGHAV KAPOOR",
    image: "/images/extra/02.png",
  },
  {
    id: 3,
    name: "ANANYA IYER",
    image: "/images/extra/03.png",
  },
  {
    id: 4,
    name: "PRIYA DESHMUKH",
    image: "/images/extra/04.png",
  },
  {
    id: 5,
    name: "ISHITA REDDY",
    image: "/images/extra/05.png",
  },
  {
    id: 6,
    name: "SANJANA CHAUHAN",
    image: "/images/extra/06.png",
  },
]

export default function TopModelsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

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
    <motion.section 
      ref={sectionRef}
      className="w-full bg-stone-100 py-12 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8 text-red-800"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          OUR TOP MODELS
        </motion.h2>

        <motion.div 
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Carousel container */}
          <div ref={carouselRef} className="flex overflow-x-hidden snap-x snap-mandatory">
            {/* Map through models and create slides */}
            {topModels.map((model, index) => (
              <motion.div
                key={model.id}
                className="relative flex-shrink-0 w-[280px] h-[360px] rounded-3xl overflow-hidden snap-start mr-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Model image */}
                <Image src={model.image || "/placeholder.svg"} alt={model.name} fill className="object-cover" />

                {/* Improved vertical name label with animation */}
                <motion.div 
                  className="absolute top-0 left-0 h-full flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <div className="h-full flex items-center">
                    <div className="relative w-12 h-full bg-gradient-to-r from-black/60 to-transparent">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap origin-center w-[360px]">
                        <p className="text-white text-2xl font-bold tracking-wider translate-x-5">{model.name}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation controls */}
        <motion.div 
          className="mt-6 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Navigation buttons */}
          <motion.button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-red-800 flex items-center justify-center text-red-800 mr-2 hover:bg-red-800 hover:text-white transition-colors"
            aria-label="Previous slide"
            disabled={currentIndex === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-red-800 flex items-center justify-center text-red-800 mr-6 hover:bg-red-800 hover:text-white transition-colors"
            aria-label="Next slide"
            disabled={currentIndex === totalSlides - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={20} />
          </motion.button>

          {/* Progress bar with animation */}
          <div className="relative flex-grow h-1 bg-stone-300 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-red-800 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}