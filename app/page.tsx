import { Hero } from "@/components/hero"
import { FeaturedWorks } from "@/components/featured-works"
import { FullWidthShowcase } from "@/components/full-width-showcase"
import { ArtistStatement } from "@/components/artist-statement"
import { GallerySection } from "@/components/gallery-section"
import { Exhibitions } from "@/components/exhibitions"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeaturedWorks />
      <FullWidthShowcase />
      <ArtistStatement />
      <GallerySection />
      <Exhibitions />
      <Contact />
      <Footer />
    </main>
  )
}
