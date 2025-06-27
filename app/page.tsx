import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GeneratorTool } from "@/components/generator-tool"
import { HowItWorks } from "@/components/how-it-works"
import { Gallery } from "@/components/gallery"
import { BlogSection } from "@/components/blog-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AdBanner position="top" />
      <GeneratorTool />
      <HowItWorks />
      <Gallery />
      <BlogSection />
      <AboutSection />
      <Footer />
    </>
  )
}
