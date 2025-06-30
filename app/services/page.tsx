"use client"

import { ArrowRight, CheckCircle, Camera, Film, Palette, Video, Lightbulb, Sparkles } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Discover our comprehensive range of AI-powered commercial solutions designed to elevate your brand.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Service 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-all duration-500 group">
            <div className="h-64 bg-gradient-to-r from-red-500 to-orange-500 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-20 h-20 text-white/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">AI-Powered Commercial Ads</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-red-700/80 mb-6">
                Revolutionary commercial ads that leverage AI to create stunning visuals and compelling narratives that
                drive engagement and conversions.
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
              <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full group-hover:shadow-lg transition-all duration-300 py-3 font-medium flex items-center justify-center">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-all duration-500 group">
            <div className="h-64 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Film className="w-20 h-20 text-white/80" />
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
              <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full group-hover:shadow-lg transition-all duration-300 py-3 font-medium flex items-center justify-center">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-all duration-500 group">
            <div className="h-64 bg-gradient-to-r from-red-600 to-red-400 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Palette className="w-20 h-20 text-white/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">Brand Identity Design</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-red-700/80 mb-6">
                AI-enhanced brand identity design that creates cohesive, memorable visual systems that resonate with
                your target audience.
              </p>
              <ul className="space-y-3 mb-6">
                {["Logo design", "Visual identity", "Brand guidelines", "Marketing materials"].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                    <span className="text-red-800">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full group-hover:shadow-lg transition-all duration-300 py-3 font-medium flex items-center justify-center">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-all duration-500 group">
            <div className="h-64 bg-gradient-to-r from-orange-400 to-red-500 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="w-20 h-20 text-white/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">Social Media Content</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-red-700/80 mb-6">
                Engaging, platform-optimized content that leverages AI to create scroll-stopping visuals and compelling
                narratives.
              </p>
              <ul className="space-y-3 mb-6">
                {["Platform-specific content", "Trend analysis", "Engagement optimization", "Content calendar"].map(
                  (feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-red-800">{feature}</span>
                    </li>
                  ),
                )}
              </ul>
              <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full group-hover:shadow-lg transition-all duration-300 py-3 font-medium flex items-center justify-center">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-red-100 mb-16">
          <h2 className="text-3xl font-bold text-red-800 mb-8 text-center">Our Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Lightbulb className="w-8 h-8 text-white" />,
                title: "Discovery",
                description: "We learn about your brand, goals, and target audience",
              },
              {
                icon: <Sparkles className="w-8 h-8 text-white" />,
                title: "Concept",
                description: "AI-powered ideation to create unique concepts",
              },
              {
                icon: <Camera className="w-8 h-8 text-white" />,
                title: "Production",
                description: "Rapid AI production with expert oversight",
              },
              {
                icon: <Film className="w-8 h-8 text-white" />,
                title: "Delivery",
                description: "Final delivery with analytics and optimization",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center mb-4 z-10">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-red-800 mb-2 text-center">{step.title}</h3>
                  <p className="text-red-600/80 text-center">{step.description}</p>
                </div>

                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-800 mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-lg text-red-700/80 max-w-3xl mx-auto mb-8">
            Contact us today to discuss how our AI-powered commercial solutions can elevate your brand.
          </p>
          <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Get Started Today
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
