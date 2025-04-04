"use client"

import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <main className="min-h-screen text-white relative pt-20">
      {/* Background Image - shifted to bottom */}
      <div className="absolute inset-0 flex justify-center items-end overflow-hidden z-0">
        <Image
          src="/images/hero.png"
          alt="Fashion model in red blazer"
          width={1200}
          height={1000}
          className="w-auto h-auto max-w-none scale-120 object-cover object-bottom"
          priority
        />
      </div>
      
      {/* Content overlay */}
      <section className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Top bubble with "LOOKS THAT STAND OUT" */}
            <div className="relative top-9 left-20">
              <div className="bg-white rounded-3xl p-6 inline-block">
                <div className="flex items-start">
                  <div className="w-2 h-16 bg-red-800 mr-4"></div>
                  <h2 className="text-3xl font-extrabold text-red-800 leading-tight">
                    LOOKS THAT
                    <br />
                    STAND OUT
                  </h2>
                </div>
              </div>
            </div>
            
            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl font-black leading-30 text-black relative top-90 left-20">
              LOOK
              <br />
              FABULOUS
            </h1>
          </div>
          
          {/* Right Column - Now just for UI elements */}
          <div className="relative">
            {/* Agency description bubble */}
            <div className="rounded-3xl p-6 max-w-xs ml-auto relative right-45 top-5">
              <p className="text-black text-sm">
                Our agency envisions a world where uniqueness and diversity are celebrated, where everyone can step into
                the spotlight and be a shining star
              </p>
              <Link href="#" className="text-red-800 font-medium flex items-center mt-2">
                Learn more <span className="ml-1">→</span>
              </Link>
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-auto space-y-4 ml-auto max-w-xs relative top-80">
              <Link href="#" className="bg-white text-black rounded-full px-8 py-3 font-medium block text-center">
                Get Involved
              </Link>
              <Link href="#" className="bg-red-800 text-white rounded-full px-8 py-3 font-medium block text-center">
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}