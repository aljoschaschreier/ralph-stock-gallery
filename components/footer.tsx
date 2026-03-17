"use client"

import { Instagram } from "lucide-react"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

export function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="px-6 py-20 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h3 className="font-serif text-2xl text-foreground mb-2">
            Ralph Stock
          </h3>
          <p className="text-muted-foreground mb-10">
            {language === "de" ? "Zeitgenössischer Maler" : language === "fr" ? "Peintre Contemporain" : "Contemporary Painter"}
          </p>

          <div className="flex flex-col items-center gap-4 mb-16">
            <a
              href="mailto:mail@ralphstock.com"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              mail@ralphstock.com
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ralph Stock. {t("footer.rights", language)}
          </p>
        </div>
      </div>
    </footer>
  )
}
