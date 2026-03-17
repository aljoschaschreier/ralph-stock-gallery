"use client"

import Link from "next/link"
import Image from "next/image"
import { artworks } from "@/lib/artworks"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

export default function GalleryPage() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-16 pt-28 pb-8 border-b border-border">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("gallery.back", language)}
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight">
          {t("gallery.title", language)}
        </h1>
        <p className="mt-3 text-muted-foreground text-base max-w-2xl">
          {t("gallery.description", language)}
        </p>
      </header>

      {/* Gallery — masonry grid layout with 2cm side margins and 1cm gaps */}
      <section className="py-0 px-[56px] pb-[3cm]">
        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-7">
          {artworks.map((artwork) => (
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
                    {/* Hover overlay with title */}
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
      </section>
    </main>
  )
}
