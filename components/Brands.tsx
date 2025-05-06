"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

// Brand data type
type Brand = {
  id: number
  name: string
  logo: string
}

// Sample brand data
const brands: Brand[] = [
  {
    id: 1,
    name: "Vogue",
    logo: "/images/logo/vogue.png",
  },
  {
    id: 2,
    name: "Gucci",
    logo: "/images/logo/gucci.png",
  },
  {
    id: 3,
    name: "Prada",
    logo: "/images/logo/prada.png",
  },
  {
    id: 4,
    name: "Versace",
    logo: "/images/logo/versace.png",
  },
  {
    id: 5,
    name: "Chanel",
    logo: "/images/logo/chanel.png",
  },
  {
    id: 6,
    name: "Dior",
    logo: "/images/logo/dior.png",
  },
]

export default function BrandCollaborations({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  return (
    <motion.section 
      ref={sectionRef}
      id={id}
      className="w-full bg-black py-16 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-red-800"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          BRANDS WE&apos;VE COLLABORATED WITH
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {brands.map((brand, index) => (
            <motion.div 
              key={brand.id} 
              className="flex items-center justify-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.div 
                className="bg-white/5 hover:bg-white/10 rounded-xl p-6 w-full h-32 flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-white/20"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain filter invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.p 
            className="text-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            Our agency has proudly partnered with some of the most prestigious brands in the fashion industry, creating
            iconic campaigns that showcase our exceptional talent.
          </motion.p>
          <Link href={"/contact"}>
            <motion.button 
              className="mt-8 px-8 py-3 bg-transparent border border-red-800 text-red-800 hover:bg-red-800 hover:text-white rounded-full font-medium transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Become a Partner
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}