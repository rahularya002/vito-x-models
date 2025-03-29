import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <main className="min-h-screen  text-white">
      <section className="container mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* Left Column */}
          <div className="space-y-6 z-10">
            {/* Top bubble with "LOOKS THAT STAND OUT" */}
            <div className="relative">
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
            <h1 className="text-6xl md:text-8xl font-black leading-none text-black">
              LOOK
              <br />
              FABULOUS
            </h1>
          </div>

          {/* Right Column */}
          <div className="relative">
            {/* Main model image */}
            <div className="relative">
              <Image
                src="/model.jpg"
                alt="Fashion model in red blazer"
                width={600}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Agency description bubble */}
            <div className="absolute top-4 right-4 bg-white rounded-3xl p-6 max-w-xs">
              <p className="text-black text-sm">
                Our agency envisions a world where uniqueness and diversity are celebrated, where everyone can step into
                the spotlight and be a shining star
              </p>
              <Link href="#" className="text-red-800 font-medium flex items-center mt-2">
                Learn more <span className="ml-1">→</span>
              </Link>
            </div>

            {/* Magazine cover bubble */}

            {/* CTA Buttons */}
            <div className="absolute bottom-50 right-4 space-y-4">
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

