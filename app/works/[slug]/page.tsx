"use client"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getArtworkBySlug, getPreviousArtwork, getNextArtwork, artworks } from "@/lib/artworks"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"
import { ImageMagnifier } from "@/components/image-magnifier"
import * as React from "react"

export default function ArtworkPage(props: { params: Promise<{ slug: string }> }) {
  const { language } = useLanguage()
  const { slug } = React.use(props.params)

  const artwork = getArtworkBySlug(slug)

  if (!artwork) {
    notFound()
  }

  const previousArtwork = getPreviousArtwork(slug)
  const nextArtwork = getNextArtwork(slug)
  const descriptionKey = `artwork.${artwork.slug}.description` as any
  const mediumLabel =
    artwork.medium === "Oil on canvas"
      ? t("medium.oil-on-canvas", language)
      : artwork.medium === "Oil on hardboard"
      ? t("medium.oil-on-hardboard", language)
      : artwork.medium
  const rawDescription = t(descriptionKey, language)
  const description = (rawDescription === descriptionKey ? artwork.description : rawDescription).replace(/\s*\d+\s×\s\d+\s*cm\.?$/u, "")

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Minimal Top Navigation — offset by fixed header height */}
      <nav className="px-8 md:px-12 lg:px-16 pt-32 pb-8">
        <div className="flex items-center justify-between">
          <Link 
            href="/#gallery" 
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("gallery.back", language)} to {t("gallery.title", language)}
          </Link>
          <div />
        </div>
      </nav>

      {/* Main Artwork Display */}
      <section className="flex-1 flex flex-col items-center justify-center px-8 md:px-12 lg:px-16 py-12 lg:py-16">
        {/* The Artwork — natural proportions, max width constrained */}
        <div className="w-full max-w-2xl mx-auto relative">
          {/* Sticky nav: stays at viewport center while painting is in view */}
          {previousArtwork ? (
            <Link
              href={`/works/${previousArtwork.slug}`}
              scroll={false}
              aria-label={language === "de" ? "Vorheriges Kunstwerk" : language === "fr" ? "Œuvre précédente" : "Previous artwork"}
              className="group absolute left-[-86px] md:left-[-94px] top-0 h-full z-10 inline-flex items-start"
            >
              <span className="sticky top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-border/50 text-muted-foreground/70 hover:text-foreground group-hover:border-border transition-colors">
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </span>
            </Link>
          ) : null}

          {nextArtwork ? (
            <Link
              href={`/works/${nextArtwork.slug}`}
              scroll={false}
              aria-label={language === "de" ? "Nächstes Kunstwerk" : language === "fr" ? "Œuvre suivante" : "Next artwork"}
              className="group absolute right-[-86px] md:right-[-94px] top-0 h-full z-10 inline-flex items-start"
            >
              <span className="sticky top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-border/50 text-muted-foreground/70 hover:text-foreground group-hover:border-border transition-colors">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ) : null}

          <ImageMagnifier imageSrc={artwork.image}>
            <div className="painting-frame-hero-minimal overflow-hidden leading-[0]">
              <Image
                src={artwork.image}
                alt={artwork.title}
                width={artwork.imgWidth}
                height={artwork.imgHeight}
                className="w-full h-auto block"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>
          </ImageMagnifier>
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs text-muted-foreground/40 tracking-wider">
            {artworks.findIndex((a) => a.slug === slug) + 1} / {artworks.length}
          </span>
        </div>

        {/* Museum Label - Directly Below */}
        <div className="mt-8 lg:mt-8 text-center">
          <h1 className="font-serif text-xl md:text-2xl text-foreground tracking-tight italic">
            {artwork.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground tracking-wide">
            {artwork.year}
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60 tracking-wider">
            {mediumLabel}, {artwork.dimensions}
          </p>
        </div>

        {/* Contemplative Description */}
        <p className="mt-10 max-w-md text-center text-sm text-foreground/70 leading-relaxed">
          {description}
        </p>
      </section>
    </main>
  )
}
