"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function InstagramGallery() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 600
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount 
        : scrollRef.current.scrollLeft + scrollAmount
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  // Instagram gallery images
  const galleryImages = [
    {
      src: "/images/extra/11.png",
      alt: "Model with hat on pink background",
      className: "row-span-1 col-span-1"
    },
    {
      src: "/images/extra/12.png",
      alt: "Model in red dress",
      className: "row-span-2 col-span-1"
    },
    {
      src: "/images/extra/13.png",
      alt: "Model with yellow background",
      className: "row-span-1 col-span-1"
    },
    {
      src: "/images/extra/14.png",
      alt: "Model with headwrap",
      className: "row-span-1 col-span-1"
    },
    {
      src: "/images/extra/15.png",
      alt: "Model in blue dress",
      className: "row-span-2 col-span-1"
    },
    {
      src: "/images/extra/16.png",
      alt: "Model with purple lighting",
      className: "row-span-1 col-span-1"
    },
    {
      src: "/images/extra/17.png",
      alt: "Model in black and white",
      className: "row-span-1 col-span-1"
    },
    {
      src: "/images/extra/18.png",
      alt: "Model in colorful outfit",
      className: "row-span-1 col-span-1"
    },
    {
      src: "/images/extra/19.png",
      alt: "Model with black hoodie",
      className: "row-span-1 col-span-1"
    },
    {
      src: "/images/extra/20.png",
      alt: "Model with sunglasses",
      className: "row-span-1 col-span-1"
    },
    {
      src: "/images/extra/21.png",
      alt: "Model with dramatic lighting",
      className: "row-span-2 col-span-1"
    }
  ]

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-800">INSTAGRAM</h2>
          
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`rounded-full w-10 h-10 flex items-center justify-center border border-red-800 text-red-800 transition-opacity ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-800/10'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`rounded-full w-10 h-10 flex items-center justify-center border border-red-800 text-red-800 transition-opacity ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-800/10'}`}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          onScroll={checkScrollButtons}
        >
          {/* First column */}
          <div className="grid grid-rows-2 gap-4 min-w-[150px] md:min-w-[200px]">
            <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
              <Image 
                src={galleryImages[0].src || "/placeholder.svg"} 
                alt={galleryImages[0].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
              <Image 
                src={galleryImages[8].src || "/placeholder.svg"} 
                alt={galleryImages[8].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Second column */}
          <div className="relative h-[310px] md:h-[410px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
            <Image 
              src={galleryImages[1].src || "/placeholder.svg"} 
              alt={galleryImages[1].alt}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Third column */}
          <div className="grid grid-rows-2 gap-4 min-w-[150px] md:min-w-[200px]">
            <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
              <Image 
                src={galleryImages[2].src || "/placeholder.svg"} 
                alt={galleryImages[2].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
              <Image 
                src={galleryImages[3].src || "/placeholder.svg"} 
                alt={galleryImages[3].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Fourth column */}
          <div className="relative h-[310px] md:h-[410px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
            <Image 
              src={galleryImages[4].src || "/placeholder.svg"} 
              alt={galleryImages[4].alt}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Fifth column */}
          <div className="grid grid-rows-2 gap-4 min-w-[150px] md:min-w-[200px]">
            <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
              <Image 
                src={galleryImages[5].src || "/placeholder.svg"} 
                alt={galleryImages[5].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
              <Image 
                src={galleryImages[6].src || "/placeholder.svg"} 
                alt={galleryImages[6].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Sixth column */}
          <div className="grid grid-rows-2 gap-4 min-w-[150px] md:min-w-[200px]">
            <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
              <Image 
                src={galleryImages[7].src || "/placeholder.svg"} 
                alt={galleryImages[7].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
              <Image 
                src={galleryImages[9].src || "/placeholder.svg"} 
                alt={galleryImages[9].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Seventh column */}
          <div className="relative h-[310px] md:h-[410px] w-[150px] md:w-[200px] rounded-lg overflow-hidden">
            <Image 
              src={galleryImages[10].src || "/placeholder.svg"} 
              alt={galleryImages[10].alt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
