"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutUs({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  // Variants for staggered animations
  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + (index * 0.2),
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    })
  }

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className="w-full bg-neutral-100 pt-20 pb-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid md:grid-cols-2 max-w-7xl mx-auto">
        {/* Left side - Runway Image */}
        <motion.div 
          className="relative h-[400px] md:h-full min-h-[400px]"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/images/extra/03.png"
            alt="Model walking on runway"
            fill
            className="object-cover rounded-l-3xl"
            priority
          />
        </motion.div>

        {/* Right side - About Us Content */}
        <motion.div 
          className="bg-zinc-900 text-white p-8 md:p-12 flex flex-col justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            ABOUT US
          </motion.h2>

          <motion.h3 
            className="text-xl md:text-2xl text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Model Magnifique
          </motion.h3>

          <motion.p 
            className="text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            At Visionary Brothers, we are proud to present “Be the Royal Pick”, India’s first AI-powered male and female model showcase — where real faces meet virtual brilliance.
            In a world where fashion is fast, we slow down to focus on crafting excellence. Whether you're a budding model or a brand seeking the perfect face, our platform blends authenticity with innovation. We build high-end digital twins — AI-generated versions of our registered models — that brands can select for photo shoots, ramp walks, and promotional campaigns.
            This isn’t just modelling — it’s next-gen storytelling powered by AI.
            With “Be the Royal Pick”, you’re entering a legacy.
            Your digital twin, their royal pick.
            Join Visionary Brothers Models to become a part of the future — where technology meets tradition, and your face becomes a brand’s first choice.
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {[0, 1, 2].map((index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center"
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={statsVariants}
              >
                {/* <motion.div 
                  className="text-3xl md:text-4xl font-bold mb-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.2) }}
                >
                  {index === 0 ? "24+" : index === 1 ? "215+" : "102+"}
                </motion.div> */}
                {/* <motion.div 
                  className="text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + (index * 0.2) }}
                >
                  {index === 0 ? (
                    <>
                      Year
                      <br />
                      Experience
                    </>
                  ) : index === 1 ? (
                    <>
                      Talented
                      <br />
                      Models
                    </>
                  ) : (
                    <>
                      Brand
                      <br />
                      Corporation
                    </>
                  )}
                </motion.div> */}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}