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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-green-50">
      <Header />
      <AdBanner position="top" />

      <main className="container mx-auto px-4 py-8 space-y-16">
        <HeroSection />
        <GeneratorTool />
        <HowItWorks />
        <Gallery />
        <BlogSection />
        <AboutSection />
      </main>

      <Footer />
    </div>
  )
}
