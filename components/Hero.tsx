"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 flex justify-center items-end overflow-hidden z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/images/hero.png"
            alt="Fashion model in red blazer"
            width={800}
            height={800}
            className="w-auto h-auto max-w-none object-cover object-bottom"
            priority
          />
        </motion.div>
      </div>

      {/* Content overlay */}
      <div className="container mx-auto px-4 py-8 relative z-10 min-h-screen flex flex-col justify-between">
        {/* Top section with diagonal elements */}
        <div className="pt-16 md:pt-24">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative element */}
            <motion.div
              className="absolute -left-4 top-1/2 w-16 h-1 bg-red-600"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            ></motion.div>

            {/* Main heading with creative layout */}
            <motion.h1
              className="text-7xl sm:text-8xl md:text-9xl font-black leading-none text-white ml-16"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              LOOK
              <br />
              <span className="text-red-600">FABULOUS</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Bottom section with asymmetrical layout */}
        <div className="pb-16 md:pb-24">
          {/* CTA Buttons with creative styling */}
          <motion.div
            className="space-y-4 flex flex-col items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link href="/contact" className="group flex items-center">
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                  <span className="text-black text-xs">01</span>
                </span>
                <span className="text-white text-lg font-medium group-hover:text-red-600 transition-colors">
                  Get Involved
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link href="/contact" className="group flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3">
                  <span className="text-white text-xs">02</span>
                </span>
                <span className="text-white text-lg font-medium group-hover:text-red-600 transition-colors">
                  Contact Me
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
