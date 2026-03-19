"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { artworks } from "@/lib/artworks"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

export default function GalleryPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const sortedArtworks = [...artworks].sort((a, b) => {
    const yearDiff = Number(b.year) - Number(a.year)
    if (yearDiff !== 0) return yearDiff
    return Number(b.id) - Number(a.id)
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-16 pt-28 pb-8 border-b border-border">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) router.back()
            else router.push("/")
          }}
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("gallery.back", language)}
        </button>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight">
          {t("gallery.title", language)}
        </h1>
      </header>

      {/* Gallery — newest first, left-to-right row flow */}
      <section className="py-0 px-[1cm] pb-[3cm]">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[1cm] gap-y-[10mm]">
          {sortedArtworks.map((artwork) => (
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
