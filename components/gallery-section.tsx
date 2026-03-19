"use client"

import Link from "next/link"
import Image from "next/image"
import { artworks } from "@/lib/artworks"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

export function GallerySection() {
  const { language } = useLanguage()
  
  // Show only first 9 paintings in the preview
  const previewArtworks = artworks.slice(0, 9)

  return (
    <section id="gallery" className="px-0 py-0 bg-secondary/50 relative">
      <div className="mx-auto max-w-full">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-8 lg:mb-12 tracking-tight px-6 md:px-12 lg:px-16 pt-16 lg:pt-20">
          {t("gallery.title", language)}
        </h2>

        {/* Gallery — masonry grid layout with 2cm side margins and 1cm gaps */}
        <div className="px-[56px] relative overflow-hidden" style={{ maxHeight: "2400px" }}>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-7">
            {previewArtworks.map((artwork) => (
              <Link
                key={artwork.id}
                href={`/works/${artwork.slug}`}
                className="group block mb-7 break-inside-avoid"
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
