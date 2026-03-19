"use client"

import Link from "next/link"
import Image from "next/image"
import { notFound, useRouter } from "next/navigation"
import { getArtworkBySlug, getPreviousArtwork, getNextArtwork, artworks } from "@/lib/artworks"
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"
import { ImageMagnifier } from "@/components/image-magnifier"
import * as React from "react"

export default function ArtworkPage(props: { params: Promise<{ slug: string }> }) {
  const { language } = useLanguage()
  const router = useRouter()
  const { slug } = React.use(props.params)
  const [fullscreenIndex, setFullscreenIndex] = React.useState<number | null>(null)

  const artwork = getArtworkBySlug(slug)

  if (!artwork) {
    notFound()
  }

  const previousArtwork = getPreviousArtwork(slug)
  const nextArtwork = getNextArtwork(slug)
  const currentArtworkIndex = artworks.findIndex((a) => a.slug === slug)
  const mediumLabel =
    artwork.medium === "Oil on canvas"
      ? t("medium.oil-on-canvas", language)
      : artwork.medium === "Oil on hardboard"
      ? t("medium.oil-on-hardboard", language)
      : artwork.medium

  const openFullscreenViewer = React.useCallback(
    async (index: number) => {
      setFullscreenIndex(index)
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen()
        }
      } catch {
        // If fullscreen API is blocked by browser policy, keep the in-app fullscreen overlay.
      }
    },
    []
  )

  const closeFullscreenViewer = React.useCallback(async () => {
    setFullscreenIndex(null)
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }
    } catch {
      // Ignore exit errors and still close overlay.
    }
  }, [])

  React.useEffect(() => {
    if (fullscreenIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        void closeFullscreenViewer()
        return
      }

      if (event.key === "ArrowLeft") {
        setFullscreenIndex((prev) => {
          if (prev === null) return prev
          return Math.max(0, prev - 1)
        })
      }

      if (event.key === "ArrowRight") {
        setFullscreenIndex((prev) => {
          if (prev === null) return prev
          return Math.min(artworks.length - 1, prev + 1)
        })
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [fullscreenIndex, closeFullscreenViewer])

  React.useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && fullscreenIndex !== null) {
        setFullscreenIndex(null)
      }
    }
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [fullscreenIndex])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Minimal Top Navigation — offset by fixed header height */}
      <nav className="px-8 md:px-12 lg:px-16 pt-32 pb-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) router.back()
              else router.push("/gallery")
            }}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("gallery.back", language)}
          </button>
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
              aria-label={t("artwork.nav.previous" as any, language)}
              className="group absolute left-2 md:left-[-94px] top-0 h-full z-10 inline-flex items-start"
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
              aria-label={t("artwork.nav.next" as any, language)}
              className="group absolute right-2 md:right-[-94px] top-0 h-full z-10 inline-flex items-start"
            >
              <span className="sticky top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-border/50 text-muted-foreground/70 hover:text-foreground group-hover:border-border transition-colors">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ) : null}

          <ImageMagnifier imageSrc={artwork.image}>
            <div className="relative">
              <button
                type="button"
                onClick={() => void openFullscreenViewer(currentArtworkIndex)}
                className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white/90 transition-colors hover:border-white/70 hover:bg-black/50"
                aria-label={t("artwork.fullscreen.open" as any, language)}
              >
                <Maximize2 className="h-4 w-4" />
              </button>

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
      </section>

      {fullscreenIndex !== null ? (
        <div className="fixed inset-0 z-[100] bg-black/95" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => void closeFullscreenViewer()}
            className="absolute inset-0"
            aria-label={t("artwork.fullscreen.close" as any, language)}
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-center pt-[10mm] pb-[10mm] px-4 md:px-10">
            <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
              <button
                type="button"
                onClick={() => setFullscreenIndex((prev) => (prev === null ? null : Math.max(0, prev - 1)))}
                disabled={fullscreenIndex === 0}
                aria-label={t("artwork.image.previous" as any, language)}
                className="absolute left-0 md:left-2 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/90 transition-colors hover:border-white/60 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="h-full w-full flex items-center justify-center">
                <Image
                  src={artworks[fullscreenIndex].image}
                  alt={artworks[fullscreenIndex].title}
                  width={artworks[fullscreenIndex].imgWidth}
                  height={artworks[fullscreenIndex].imgHeight}
                  className="max-h-full h-full w-auto max-w-full object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={() => setFullscreenIndex((prev) => (prev === null ? null : Math.min(artworks.length - 1, prev + 1)))}
                disabled={fullscreenIndex === artworks.length - 1}
                aria-label={t("artwork.image.next" as any, language)}
                className="absolute right-0 md:right-2 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/90 transition-colors hover:border-white/60 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-xs tracking-wider text-white/80">
              {fullscreenIndex + 1} / {artworks.length}
            </p>
          </div>
        </div>
      ) : null}
    </main>
  )
}
