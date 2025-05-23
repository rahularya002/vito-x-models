import { Header } from "@/components/header"
import { VideoHeroSection } from "@/components/video-hero-section"
import { ServicesSection } from "@/components/services-section"
import { VideoShowcase } from "@/components/video-showcase"
import { ModelsSection } from "@/components/models-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <VideoHeroSection />
      <ServicesSection />
      <VideoShowcase />
      <ModelsSection />
    </main>
  )
}
