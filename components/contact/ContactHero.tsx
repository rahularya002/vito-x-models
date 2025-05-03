import Image from "next/image";
import Link from "next/link";

export const ContactHero = () => {
  return (
    <section className="relative w-full h-[40vh] min-h-[300px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
      <Image src="/images/extra/09.png" alt="Contact us" fill className="object-cover" priority />
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">PROMOTE WITH US</h1>
          <Link
            href="/"
            className="bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition text-sm md:text-base"
          >
            Home →
          </Link>
        </div>
        <p className="text-xl md:text-2xl max-w-2xl text-white/80">
          Elevate your brand with our exceptional talent and creative expertise
        </p>
      </div>
    </section>
  );
}; 