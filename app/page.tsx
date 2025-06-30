"use client"

import { useState, useEffect } from "react"
import {
  ArrowDown,
  Play,
  Camera,
  Film,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <div className="mb-8">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight transition-all duration-1000 ${mounted ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-12"
                }`}
            >
              <span className="block bg-gradient-to-r from-red-800 via-red-600 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                We Don't Shoot Ads.
              </span>
              <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-red-800 bg-clip-text text-transparent drop-shadow-lg mt-2">
                We Create AI-Powered
              </span>
              <span className="block bg-gradient-to-r from-red-800 via-red-600 to-orange-600 bg-clip-text text-transparent drop-shadow-lg mt-2 relative">
                Experiences.
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-400 rounded-full animate-ping opacity-75"></div>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-red-700/80 mb-10 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-300 ${mounted ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
          >
            From commercial magic to cinematic storytelling — made by{" "}
            <span className="font-semibold text-red-800">Visionary Brothers</span>, backed by AI.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500 ${mounted ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
          >
            <Link href={'https://enbquantum.co.in/services'}>
              <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group flex items-center">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Explore Our Work
              </button>
            </Link>
              
            <button className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm">
              Get a Quote
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 flex justify-center">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-red-600/60 text-sm font-medium">Scroll to explore</span>
              <ArrowDown className="w-6 h-6 text-red-500 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Why AI Commercials Work Section */}
      <section className="py-20 px-6 relative z-10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">Why AI Commercials Work</h2>
            <p className="text-lg text-red-700/80 max-w-3xl mx-auto">
              Our AI-powered approach delivers stunning results that traditional methods simply can't match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Lightbulb className="w-8 h-8 text-white" />,
                title: "Creative Freedom",
                description: "AI enables unlimited creative possibilities without traditional production constraints.",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-white" />,
                title: "Higher Engagement",
                description: "Our AI commercials achieve 3x higher engagement rates than traditional ads.",
              },
              {
                icon: <Users className="w-8 h-8 text-white" />,
                title: "Personalization",
                description: "Tailor content to specific audiences with unprecedented precision.",
              },
              {
                icon: <Clock className="w-8 h-8 text-white" />,
                title: "Faster Production",
                description: "Reduce production time from months to days without sacrificing quality.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3 text-center">{item.title}</h3>
                <p className="text-red-600/80 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">Our Services</h2>
        <p className="text-lg text-red-700/80 max-w-3xl mx-auto">
          We offer cutting-edge AI-powered commercial solutions tailored to your brand's unique needs.
        </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Service 1 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-all duration-500 group">
          <div className="h-64 bg-gradient-to-r from-red-500 to-orange-500 relative overflow-hidden">
            <img
          src="/ads.png"
          alt="AI-Powered Commercial Ads"
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="w-20 h-20 text-white/80 drop-shadow-lg" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
          <h3 className="text-2xl font-bold text-white">AI-Powered Commercial Ads</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-red-700/80 mb-6">
          Revolutionary commercial ads that leverage AI to create stunning visuals and compelling narratives
          that drive engagement and conversions.
            </p>
            <ul className="space-y-3 mb-6">
          {["Hyper-realistic visuals", "Targeted messaging", "Rapid production", "Cost-effective"].map(
            (feature, i) => (
              <li key={i} className="flex items-center">
            <CheckCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
            <span className="text-red-800">{feature}</span>
              </li>
            ),
          )}
            </ul>
            <Link href={"https://enbquantum.co.in/services"}>
            <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full group-hover:shadow-lg transition-all duration-300 py-3 font-medium flex items-center justify-center">
          Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
          </div>
        </div>

        {/* Service 2 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-all duration-500 group">
          <div className="h-64 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
            <img
          src="/short-films.png"
          alt="AI-Powered Commercial Short Films"
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
          <Film className="w-20 h-20 text-white/80 drop-shadow-lg" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
          <h3 className="text-2xl font-bold text-white">AI-Powered Commercial Short Films</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-red-700/80 mb-6">
          Cinematic short films that tell your brand's story with emotional depth and visual excellence, powered
          by cutting-edge AI technology.
            </p>
            <ul className="space-y-3 mb-6">
          {["Cinematic quality", "Emotional storytelling", "Brand narrative", "Custom scenarios"].map(
            (feature, i) => (
              <li key={i} className="flex items-center">
            <CheckCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
            <span className="text-red-800">{feature}</span>
              </li>
            ),
          )}
            </ul>
            <Link href={"https://enbquantum.co.in/services"}>
              <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full group-hover:shadow-lg transition-all duration-300 py-3 font-medium flex items-center justify-center">
            Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* Trusted By Brands Section */}
      <section className="py-16 px-6 relative z-10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-800 mb-4">Trusted By Brands</h2>
            <p className="text-lg text-red-700/80 max-w-3xl mx-auto">
              Leading companies trust us to deliver exceptional AI-powered commercial experiences.
            </p>
          </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[
              "/logos/tulalip.png",
              "/logos/ice-logo.png",
              "/logos/ices.png",
              "/logos/rajasthali.png",
              "/logos/vb.png",
              "/logos/tulalip.png",
            ].map((src, i) => (
              <div
              key={i}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
              >
              <div className="w-24 h-24 bg-red-100/50 rounded-full flex items-center justify-center">
                <img
                src={src}
                alt={`Brand ${i + 1} logo`}
                className="max-h-16 max-w-16 object-contain"
                />
              </div>
              </div>
            ))}
            </div>
        </div>
      </section>

      {/* Latest Work Section */}
      <section id="work" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">Latest Work</h2>
        <p className="text-lg text-red-700/80 max-w-3xl mx-auto">
          Explore our recent AI-powered commercial projects that have delivered exceptional results.
        </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Luxury Brand Campaign", category: "Commercial Ad", image: "/work/luxury-brand.png" },
          { title: "Tech Product Launch", category: "Short Film", image: "/work/tech-prod.png" },
          { title: "Fashion Collection", category: "Commercial Ad", image: "/work/fashion-coll.png" },
          { title: "Automotive Experience", category: "Short Film", image: "/work/auto-exp.png" },
          { title: "Food & Beverage", category: "Commercial Ad", image: "/work/food-bev.png" },
          { title: "Travel Destination", category: "Short Film", image: "/work/travel-dest.png" },
        ].map((project, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
          >
            <div className="aspect-video bg-gradient-to-br from-red-200 to-orange-100 relative">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-16 h-16 text-white/80" />
          </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-red-300 text-sm font-medium">{project.category}</span>
          <h3 className="text-xl font-bold text-white mt-1">{project.title}</h3>
            </div>
          </div>
        ))}
          </div>

          <div className="text-center mt-12">
            <Link href={"https://enbquantum.co.in/services"}>
              <button className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm">
              View All Projects
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative z-10 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-red-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-red-800 mb-4">Get in Touch</h2>
              <p className="text-red-700/80 mb-6">
                Ready to transform your brand with AI-powered commercials? Contact us today to discuss your project.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-red-600">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800">Location</h3>
                    <p className="text-red-600/80">123 Creative Avenue, Innovation City</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-red-600">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800">Email</h3>
                    <p className="text-red-600/80">hello@visionarybrothers.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-red-600">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800">Phone</h3>
                    <p className="text-red-600/80">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <span className="text-red-600">📱</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <span className="text-red-600">💼</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <span className="text-red-600">📸</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <span className="text-red-600">🎬</span>
                </a>
              </div>
            </div>

            <div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-red-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-red-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-red-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-red-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
