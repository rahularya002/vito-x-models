"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <main className="min-h-screen text-white relative pt-20">
      {/* Background Image - shifted to bottom */}
      <div className="absolute inset-0 flex justify-center items-end overflow-hidden z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/images/hero.png"
            alt="Fashion model in red blazer"
            width={1200}
            height={1000}
            className="w-auto h-auto max-w-none object-cover object-bottom"
            priority
          />
        </motion.div>
      </div>
     
      {/* Content overlay */}
      <section className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Top bubble with "LOOKS THAT STAND OUT" */}
            <motion.div 
              className="relative top-9 left-20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="bg-white rounded-3xl p-6 inline-block">
                <div className="flex items-start">
                  <motion.div 
                    className="w-2 h-16 bg-red-800 mr-4"
                    initial={{ height: 0 }}
                    animate={{ height: "4rem" }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  ></motion.div>
                  <h2 className="text-3xl font-extrabold text-red-800 leading-tight">
                    LOOKS THAT
                    <br />
                    STAND OUT
                  </h2>
                </div>
              </div>
            </motion.div>
           
            {/* Main heading */}
            <motion.h1 
              className="text-6xl md:text-8xl font-black leading-30 text-black relative top-90 left-20"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                LOOK
                <br />
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                FABULOUS
              </motion.span>
            </motion.h1>
          </div>
         
          {/* Right Column - Now just for UI elements */}
          <div className="relative">
            {/* Agency description bubble */}
            <motion.div 
              className="rounded-3xl p-6 max-w-xs ml-auto relative right-45 top-5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <p className="text-black text-sm">
                Our agency envisions a world where uniqueness and diversity are celebrated, where everyone can step into
                the spotlight and be a shining star
              </p>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link href="#" className="text-red-800 font-medium flex items-center mt-2">
                  Learn more <span className="ml-1">→</span>
                </Link>
              </motion.div>
            </motion.div>
           
            {/* CTA Buttons */}
            <motion.div 
              className="mt-auto space-y-4 ml-auto max-w-xs relative top-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link href="#" className="bg-white text-black rounded-full px-8 py-3 font-medium block text-center">
                  Get Involved
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link href="#" className="bg-red-800 text-white rounded-full px-8 py-3 font-medium block text-center">
                  Contact Me
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}