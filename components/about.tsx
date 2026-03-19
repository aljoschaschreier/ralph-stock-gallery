"use client"

import Image from "next/image"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

export function About() {
  const { language } = useLanguage()

  return (
    <section className="px-6 py-32 lg:py-48">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight mb-10">
          {t("about.title", language)}
        </h1>

        {/* Portrait first on mobile; on desktop it sits to the right of the text */}
        <div className="md:flex md:items-start md:gap-10">
          <div className="mx-auto md:mx-0 md:ml-10 mt-0 md:mt-0 flex-shrink-0 md:order-2">
            <div className="w-40 md:w-52 lg:w-60 overflow-hidden bg-muted rounded">
              <Image
                src="/artist-portrait.png"
                alt={t("about.title", language)}
                width={768}
                height={1024}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-6 text-foreground/80 leading-relaxed text-base md:text-lg flex-1 mt-8 md:mt-0 md:order-1">
            <p>{t("about.p1", language)}</p>
            <p>{t("about.p2", language)}</p>
            <p>{t("about.p3", language)}</p>
            <p>{t("about.p4", language)}</p>
            <p>{t("about.p5", language)}</p>

            <blockquote className="pt-6 space-y-2">
              <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground text-balance">
                {t("about.quote", language)}
              </p>
              <footer className="text-muted-foreground text-lg pt-1">
                — Joseph Beuys
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
