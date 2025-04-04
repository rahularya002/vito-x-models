import Image from "next/image"

export default function AboutUs() {
  return (
    <section className="w-full bg-neutral-100 pt-20">
      <div className="grid md:grid-cols-2 max-w-7xl mx-auto">
        {/* Left side - Runway Image */}
        <div className="relative h-[400px] md:h-full min-h-[400px] ">
          <Image
            src="/images/extra/03.png"
            alt="Model walking on runway"
            fill
            className="object-cover rounded-l-3xl"
            priority
          />
        </div>

        {/* Right side - About Us Content */}
        <div className="bg-zinc-900 text-white p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">ABOUT US</h2>

          <h3 className="text-xl md:text-2xl text-gray-300 mb-6">Model Magnifique</h3>

          <p className="text-gray-300 mb-10">
            Welcome to Model Magnifique, where dreams take center stage and stars are born. We are not just a modeling
            agency; we are a haven for aspiring models, a hub of creativity, and a launchpad for future icons of the
            fashion and entertainment industry.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">24+</div>
              <div className="text-sm text-gray-400">
                Year
                <br />
                Experience
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">215+</div>
              <div className="text-sm text-gray-400">
                Talented
                <br />
                Models
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">102+</div>
              <div className="text-sm text-gray-400">
                Brand
                <br />
                Corporation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

