"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

const heroSlides = [
  {
    slug: "crumble-peat-2021",
    src: "/paintings/crumble-peat-2021.jpg",
    alt: "Crumble Peat, 2021",
    title: "Crumble Peat",
    meta: "2021 | Oil on Canvas | 80 × 105 cm",
    width: 920,
    height: 1164,
  },
  {
    slug: "once-upon-a-time-below-2021",
    src: "/paintings/once-upon-a-time-below-2021.jpg",
    alt: "Once Upon A Time Below, 2021",
    title: "Once Upon A Time Below",
    meta: "2021 | Oil on Canvas | 88 × 114 cm",
    width: 920,
    height: 1164,
  },
  {
    slug: "chartreuse-2020",
    src: "/paintings/chartreuse-2020.jpg",
    alt: "Chartreuse, 2020",
    title: "Chartreuse",
    meta: "2020 | Oil on Canvas | 95 × 115 cm",
    width: 920,
    height: 1164,
  },
]

export function Hero() {
  const { language } = useLanguage()
  const [current, setCurrent] = useState(0)

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    const timer = setTimeout(goToNext, 6000)
    return () => clearTimeout(timer)
  }, [current, goToNext])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      {/* Hero Painting Slider */}
      <div className="w-full max-w-[51.84rem]">
        {/* Images stacked, crossfade — clickable to artwork page */}
        <Link
          href={`/works/${heroSlides[current].slug}`}
          className="block relative painting-frame-hero-minimal overflow-hidden leading-[0] cursor-pointer group"
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              className="transition-opacity duration-1000 block"
              style={{
                position: index === 0 ? "relative" : "absolute",
                inset: 0,
                opacity: index === current ? 1 : 0,
                pointerEvents: index === current ? "auto" : "none",
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                priority={index === 0}
                className="w-full h-auto block object-cover align-bottom"
              />
            </div>
          ))}
          {/* Soft vignette overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/[0.08]" />
        </Link>

        {/* Painting Label — crossfades in sync, clickable to artwork page */}
        <Link
          href={`/works/${heroSlides[current].slug}`}
          className="block text-center mt-6 relative h-12 cursor-pointer hover:opacity-80 transition-opacity"
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: index === current ? 1 : 0 }}
            >
              <h2 className="font-serif text-lg text-foreground italic mb-1">
                {slide.title}
              </h2>
              <p className="text-sm text-muted-foreground tracking-wide">
                {language === "en"
                  ? slide.meta
                  : slide.meta.replace(
                      "Oil on Canvas",
                      t("medium.oil-on-canvas", language)
                    )}
              </p>
            </div>
          ))}
        </Link>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Artist Name and Tagline */}
      <div className="text-center mt-20">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-3">
          Ralph Stock
        </h1>
        <p className="text-muted-foreground text-base md:text-lg tracking-widest uppercase mb-6">
          {t("hero.tagline", language)}
        </p>
        <p className="text-foreground/70 text-lg md:text-xl max-w-md mx-auto mb-12 leading-relaxed">
          {t("hero.description", language)}
        </p>
        <Link
          href="/gallery"
          className="inline-block border border-foreground px-10 py-4 text-sm tracking-widest uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          {t("hero.cta", language)}
        </Link>
      </div>
    </section>
  )
}
