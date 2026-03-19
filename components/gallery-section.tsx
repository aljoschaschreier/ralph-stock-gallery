"use client"

import Link from "next/link"
import Image from "next/image"
import { artworks } from "@/lib/artworks"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

export function GallerySection() {
  const { language } = useLanguage()

  // Show newest works first, then left-to-right in row order.
  const previewArtworks = [...artworks]
    .sort((a, b) => {
      const yearDiff = Number(b.year) - Number(a.year)
      if (yearDiff !== 0) return yearDiff
      return Number(b.id) - Number(a.id)
    })
    .slice(0, 9)

  return (
    <section id="gallery" className="px-0 py-0 bg-secondary/50 relative">
      <div className="mx-auto max-w-full">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-8 lg:mb-12 tracking-tight px-6 md:px-12 lg:px-16 pt-16 lg:pt-20">
          {t("gallery.title", language)}
        </h2>

        {/* Gallery preview */}
        <div className="px-[56px] relative overflow-hidden" style={{ maxHeight: "2400px" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {previewArtworks.map((artwork) => (
              <Link
                key={artwork.id}
                href={`/works/${artwork.slug}`}
                className="group block"
              >
                <article className="cursor-pointer">
                  <div className="painting-frame-gallery overflow-hidden relative">
                    <Image
                      src={artwork.thumbnail ?? artwork.image}
                      alt={artwork.title}
                      width={artwork.imgWidth}
                      height={artwork.imgHeight}
                      className="w-full h-auto block"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="painting-overlay">
                      <h3 className="font-serif text-lg text-white text-center">
                        {artwork.title}
                      </h3>
                      <p className="text-xs text-white/80 text-center tracking-wide mt-1">
                        {artwork.year} ·{" "}
                        {artwork.medium === "Oil on canvas"
                          ? t("medium.oil-on-canvas", language)
                          : artwork.medium === "Oil on hardboard"
                          ? t("medium.oil-on-hardboard", language)
                          : artwork.medium}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* View Full Gallery Button */}
        <div className="flex justify-center py-12 px-6">
          <Link
            href="/gallery"
            className="inline-block border border-foreground px-10 py-3 text-sm tracking-widest uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {t("gallery.view-full", language)}
          </Link>
        </div>
      </div>
    </section>
  )
}
