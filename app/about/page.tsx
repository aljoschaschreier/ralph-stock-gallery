"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { About } from "@/components/about"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

export default function AboutPage() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen bg-background">
      <header className="px-6 md:px-12 lg:px-16 pt-28 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("gallery.back", language)}
        </Link>
      </header>
      <About />
    </main>
  )
}

