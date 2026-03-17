"use client"

import Link from "next/link"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

export function ArtistStatement() {
  const { language } = useLanguage()

  return (
    <section className="px-6 py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-16 tracking-tight">
          {t("artist.title", language)}
        </h2>
        
        <div className="space-y-8 text-foreground/80 leading-relaxed text-base md:text-lg">
          <p>
            {t("artist.p1", language)}
          </p>
          
          <p>
            {t("artist.p2", language)}
          </p>

          <p>
            {t("artist.p3", language)}
          </p>

          <p>
            {t("artist.p4", language)}
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/about"
            className="inline-block border border-foreground px-10 py-3 text-sm tracking-widest uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            About the Artist
          </Link>
        </div>
      </div>
    </section>
  )
}
