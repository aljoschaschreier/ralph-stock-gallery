"use client"

import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"
import { downloadCV } from "@/lib/cv-download"

const shows = [
  { year: "2016", venue: "Art Forum Forst" },
  { year: "2015", venue: "Regional Council Karlsruhe — \"Stadtgeburtstag Karlsruhe 2015\"" },
  { year: "2015", venue: "Artist Association Speyer" },
  { year: "2014", venue: "Gallery Art Association Opera Halle" },
  { year: "2013", venue: "Château Oberschwappach, Knetzgau" },
  { year: "2009", venue: "Art Fair Baden-Württemberg, Stuttgart" },
  { year: "2009", venue: "BBK Showcase, Karlsruhe" },
  { year: "2005", venue: "Gallery Elisabethenhof, Bad Wimpfen" },
  { year: "2005", venue: "Art Fair Baden-Württemberg, Stuttgart" },
  { year: "2004", venue: "\"Bogenraum\", Business Park Karlsruhe" },
  { year: "2002", venue: "City Hall Durlach, Karlsruhe" },
  { year: "2001", venue: "Hotel \"Kaiserhof Lindner\", Landshut" },
  { year: "2000", venue: "\"Andreas Art Award 2000\", Sankt Andreasberg" },
  { year: "2000", venue: "\"Art in historical buildings\", Landshut" },
  { year: "1998", venue: "Art Gallery Karlsruhe" },
  { year: "1997", venue: "Gallery obArt Company, Karlsruhe" },
  { year: "1997", venue: "Gallery Artothek Lilo Hillens art-contact, Karlsruhe" },
]

const acquisitions = [
  { year: "2009", venue: "Regional Council Karlsruhe" },
  { year: "2004", venue: "Regional Council Karlsruhe" },
]

export default function CVPage() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 md:px-12 pt-28 pb-24">

        {/* Top nav */}
        <nav className="flex items-center justify-between mb-20">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("cv.back", language)}
          </Link>
          <button
            onClick={() => downloadCV(language)}
            className="inline-flex items-center gap-2 border border-foreground px-6 py-2.5 text-xs tracking-widest uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <Download className="w-3.5 h-3.5" />
            {t("cv.download", language)}
          </button>
        </nav>

        {/* Header */}
        <header className="mb-16 border-b border-border pb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground tracking-tight mb-6">
            Ralph Stock
          </h1>
          <p className="font-serif text-xl text-foreground tracking-tight mb-10">
            {t("cv.title", language)}
          </p>
          <div className="space-y-1 text-muted-foreground text-sm leading-relaxed">
            <p>{t("cv.born", language)}</p>
            <p>2002 — {t("cv.member", language)}</p>
            <p>{t("cv.lives", language)}</p>
          </div>
        </header>

        {/* Shows */}
        <section className="mb-16">
          <h2 className="font-serif text-xl text-foreground tracking-tight mb-8">
            {t("cv.shows", language)}
          </h2>
          <div className="space-y-4">
            {shows.map((show, i) => (
              <div key={i} className="flex gap-8 text-sm">
                <span className="w-10 shrink-0 text-muted-foreground tabular-nums">{show.year}</span>
                <span className="text-foreground/80 leading-relaxed">{show.venue}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Acquisitions */}
        <section className="mb-16 border-t border-border pt-12">
          <h2 className="font-serif text-xl text-foreground tracking-tight mb-8">
            {t("cv.acquisitions", language)}
          </h2>
          <div className="space-y-4">
            {acquisitions.map((item, i) => (
              <div key={i} className="flex gap-8 text-sm">
                <span className="w-10 shrink-0 text-muted-foreground tabular-nums">{item.year}</span>
                <span className="text-foreground/80 leading-relaxed">{item.venue}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="border-t border-border pt-12">
          <h2 className="font-serif text-xl text-foreground tracking-tight mb-8">
            {t("cv.awards", language)}
          </h2>
          <div className="flex gap-8 text-sm">
            <span className="w-10 shrink-0 text-muted-foreground tabular-nums">2016</span>
            <span className="text-foreground/80 leading-relaxed">{t("cv.award2016", language)}</span>
          </div>
        </section>

      </div>
    </main>
  )
}
