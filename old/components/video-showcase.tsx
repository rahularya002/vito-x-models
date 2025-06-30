"use client"
import { useState, useRef } from "react"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Sample video data - replace with your actual YouTube videos
const videos = [
  {
    id: "1",
    title: "AI-Generated Commercial for Tech Brand",
    description: "Created by Visionary Brothers using cutting-edge AI technology.",
    thumbnail: "https://img.youtube.com/vi/IM3I8GeJoP4/maxresdefault.jpg",
    youtubeId: "IM3I8GeJoP4",
  },
  {
    id: "2",
    title: "Short Film: The Future of Creativity",
    description: "An award-winning short film exploring the intersection of AI and human creativity.",
    thumbnail: "https://img.youtube.com/vi/7RJ_0m2SQO8/maxresdefault.jpg",
    youtubeId: "7RJ_0m2SQO8",
  },
  {
    id: "3",
    title: "Digital Marketing Campaign Results",
    description: "How Visionary Brothers helped increase brand awareness by 200%.",
    thumbnail: "https://img.youtube.com/vi/5q-tuf4ZQtw/maxresdefault.jpg",
    youtubeId: "5q-tuf4ZQtw",
  },
  {
    id: "4",
    title: "Product Promotion with AI Models",
    description: "Innovative product showcase using AI-generated models and environments.",
    thumbnail: "https://img.youtube.com/vi/BI10VmbVYsk/maxresdefault.jpg",
    youtubeId: "BI10VmbVYsk",
  },
]

export function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextVideo = () => {
    setActiveVideo((prev) => (prev + 1) % videos.length)
    setIsPlaying(false)
  }

  const prevVideo = () => {
    setActiveVideo((prev) => (prev - 1 + videos.length) % videos.length)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section id="portfolio" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mb-16">
            Explore our latest work and see how Visionary Brothers is redefining digital storytelling.
          </p>

          <div className="relative" ref={containerRef}>
            {/* Main Video Display */}
            <div className="aspect-video bg-secondary relative">
              {isPlaying ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videos[activeVideo].youtubeId}?autoplay=1&mute=0`}
                  title={videos[activeVideo].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={videos[activeVideo].thumbnail || "/placeholder.svg"}
                    alt={videos[activeVideo].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button 
                      onClick={togglePlay} 
                      className="rounded-full w-16 h-16 flex items-center justify-center bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Video Title and Description */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold">{videos[activeVideo].title}</h3>
              <p className="text-muted-foreground mt-2">{videos[activeVideo].description}</p>
            </div>

            {/* Video Navigation */}
            <div className="mt-6 flex justify-end items-center">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prevVideo} 
                  className="rounded-full border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={nextVideo} 
                  className="rounded-full border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Video Thumbnails */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => {
                    setActiveVideo(index)
                    setIsPlaying(false)
                  }}
                  className={`cursor-pointer relative aspect-video ${
                    activeVideo === index ? "opacity-100" : "opacity-80"
                  }`}
                >
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className={`h-8 w-8 ${activeVideo === index ? "text-primary" : "text-white/70"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
