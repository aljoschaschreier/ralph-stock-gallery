"use client"

import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"
import { ExhibitionSlider } from "./exhibition-slider"

export function Exhibitions() {
  const { language } = useLanguage()

  return (
    <section id="exhibitions" className="px-6 py-32 lg:py-48 bg-secondary/50">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-20 tracking-tight">
          {t("exhibitions.title", language)}
        </h2>

        {/* Exhibition Image Slider */}
        <ExhibitionSlider />
      </div>
    </section>
  )
}
