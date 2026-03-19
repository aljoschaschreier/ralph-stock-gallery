"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

const selectedWorks = [
  {
    slug: "il-risveglio-delle-forme-2021",
    title: "Il Risveglio Delle Forme",
    year: "2021",
    medium: "Oil on Canvas",
    dimensions: "89 x 114 cm",
    image: "https://static.wixstatic.com/media/05a4d7_b367b6e831624b2fab5cdd2958c874bb~mv2.jpg/v1/fit/w_920,h_1164,q_90,enc_avif,quality_auto/05a4d7_b367b6e831624b2fab5cdd2958c874bb~mv2.jpg",
    aspectRatio: "89/114",
  },
  {
    slug: "primavera-delle-forme-2021",
    title: "Primavera Delle Forme",
    year: "2021",
    medium: "Oil on Canvas",
    dimensions: "89 x 114 cm",
    image: "https://static.wixstatic.com/media/05a4d7_790285dface44faeb8e03be34d1b1d5a~mv2.jpg/v1/fit/w_920,h_1164,q_90,enc_avif,quality_auto/05a4d7_790285dface44faeb8e03be34d1b1d5a~mv2.jpg",
    aspectRatio: "89/114",
  },
  {
    slug: "autunno-delle-forme-2021",
    title: "Autunno Delle Forme",
    year: "2021",
    medium: "Oil on Canvas",
    dimensions: "89 x 114 cm",
    image: "https://static.wixstatic.com/media/05a4d7_df524ab43c594446b43031661b82b7d3~mv2.jpg/v1/fit/w_920,h_1164,q_90,enc_avif,quality_auto/05a4d7_df524ab43c594446b43031661b82b7d3~mv2.jpg",
    aspectRatio: "89/114",
  },
]

export function FeaturedWorks() {
  const { language } = useLanguage()

  return (
    <section className="px-6 py-32 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-24 lg:mb-32 tracking-tight">
          {t("works.title", language)}
        </h2>
        <div className="mx-auto -mt-16 mb-14 max-w-3xl text-center space-y-3">
          <p className="text-sm md:text-base leading-relaxed text-foreground/70">
          {t("works.series-intro", language)}
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 italic">
            Il Risveglio Delle Forme - {t("series.il-risveglio.title-translation" as any, language)} · Primavera Delle Forme - {t("series.primavera.title-translation" as any, language)} · Autunno Delle Forme - {t("series.autunno.title-translation" as any, language)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {selectedWorks.map((painting, index) => (
            <article key={index} className="group flex flex-col">
              {/* Painting */}
              <Link
                href={`/works/${painting.slug}`}
                className="block bg-muted flex items-center justify-center mb-4 painting-frame-hero-minimal overflow-hidden relative w-full max-h-72 cursor-pointer"
                style={{ aspectRatio: painting.aspectRatio }}
              >
                {painting.image ? (
                  <>
                    <Image
                      src={painting.image}
                      alt={painting.title}
                      width={920}
                      height={1164}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/[0.08] rounded-[1px]" />
                  </>
                ) : (
                  <span className="text-muted-foreground text-xs tracking-widest uppercase text-center px-4">
                    Painting Image Placeholder
                  </span>
                )}
              </Link>

              {/* Painting Info */}
              <div className="text-center">
                <h3 className="font-serif text-lg text-foreground italic mb-1">
                  {painting.title}
                </h3>
                <p className="text-sm text-muted-foreground tracking-wide">
                  {painting.year} |{" "}
                  {painting.medium === "Oil on Canvas"
                    ? t("medium.oil-on-canvas", language)
                    : painting.medium}
                </p>
                <p className="text-sm text-muted-foreground tracking-wide">
                  {painting.dimensions}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
