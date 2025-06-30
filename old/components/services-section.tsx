"use client"
import { useRef, useEffect, useState } from "react"
import type React from "react"

import { motion, useAnimation, useInView } from "framer-motion"
import { Film, Sparkles, Megaphone, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-[60%] -left-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div ref={sectionRef} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mb-16 md:mb-24"
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-xl">
                Our <span className="text-primary">services</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                We blend cutting-edge AI technology with human creativity to produce compelling visual narratives that
                captivate audiences.
              </p>
            </div>
          </motion.div>

          <div className="relative">
            <ServiceCards />
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCards() {
  return (
    <div className="relative">
      {/* Main featured service */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-20 mb-16"
      >
        <FeaturedServiceCard
          icon={<Sparkles className="h-10 w-10 text-white" />}
          title="AI Ad Films"
          description="Leveraging artificial intelligence to create stunning, personalized ad campaigns that resonate with your target audience and drive engagement."
          color="bg-primary"
          index={1}
        />
      </motion.div>

      {/* Secondary services in staggered layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="md:col-span-7 md:col-start-1 relative z-10"
        >
          <ServiceCard
            icon={<Film className="h-8 w-8" />}
            title="Short Films"
            description="Award-winning short film production with innovative storytelling techniques."
            color="bg-primary/90"
            index={2}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="md:col-span-5 md:col-start-8 md:mt-16 relative z-10"
        >
          <ServiceCard
            icon={<Megaphone className="h-8 w-8" />}
            title="Digital Marketing"
            description="Strategic digital marketing solutions to amplify your brand's presence."
            color="bg-primary/80"
            index={3}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="md:col-span-6 md:col-start-3 relative z-10"
        >
          <ServiceCard
            icon={<Users className="h-8 w-8" />}
            title="Model Promotions"
            description="Professional model-based product promotions for maximum impact."
            color="bg-primary/70"
            index={4}
          />
        </motion.div>
      </div>
    </div>
  )
}

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  index: number
}

function ServiceCard({ icon, title, description, color, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`rounded-2xl p-8 h-full relative overflow-hidden ${isHovered ? "shadow-lg" : "shadow-md"} transition-all duration-300 bg-background/50 backdrop-blur-sm border border-border/50`}
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Service number */}
        <div className="absolute top-6 right-6 font-bold text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
          0{index}
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className={`${color} text-white rounded-xl p-3 inline-block mb-4`}>{icon}</div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <Button variant="ghost" className="rounded-full p-0 h-auto text-primary group-hover:text-primary/80 transition-colors">
              Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedServiceCard({ icon, title, description, color, index }: ServiceCardProps) {
  return (
    <div className="relative">
      <div className={`${color} rounded-2xl p-10 relative overflow-hidden shadow-xl`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">{icon}</div>

          <div className="max-w-2xl">
            <div className="text-white/70 font-medium mb-2">0{index} — Featured Service</div>
            <h3 className="text-3xl font-bold mb-4 text-white">{title}</h3>
            <p className="text-white/80 text-lg mb-6">{description}</p>

            <Button className="rounded-full bg-white text-primary hover:bg-white/90">
              Explore AI Ad Films <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
