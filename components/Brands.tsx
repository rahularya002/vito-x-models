import Image from "next/image"

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

export default function BrandCollaborations() {
  return (
    <section className="w-full bg-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-red-800">BRANDS WE&apos;VE COLLABORATED WITH</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-center group">
              <div className="bg-white/5 hover:bg-white/10 rounded-xl p-6 w-full h-32 flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="relative w-full h-full">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain filter invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Our agency has proudly partnered with some of the most prestigious brands in the fashion industry, creating
            iconic campaigns that showcase our exceptional talent.
          </p>

          <button className="mt-8 px-8 py-3 bg-transparent border border-red-800 text-red-800 hover:bg-red-800 hover:text-white rounded-full font-medium transition-colors duration-300">
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  )
}

