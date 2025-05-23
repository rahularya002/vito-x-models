import AboutUs from "@/components/About";
import BrandCollaborations from "@/components/Brands";
import FooterWithLogo from "@/components/Footer";
import Hero from "@/components/Hero";
import Models from "@/components/Models";
import { Navbar } from "@/components/Navbar";
import InstagramGallery from "@/components/Social";
import TopModelsCarousel from "@/components/Top-Models";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Models />
      <TopModelsCarousel id="our-models" />
      <BrandCollaborations id="our-brands" />
      <AboutUs id="about-us" />
      <InstagramGallery id="social-platforms" />
      <FooterWithLogo />
    </div>
  );
}
