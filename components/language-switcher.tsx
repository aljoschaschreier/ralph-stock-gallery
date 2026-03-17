"use client"

import { useState } from "react"
import { useLanguage } from "@/providers/language-provider"
import { Language } from "@/lib/translations"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
    { code: "it", label: "Italiano" },
    { code: "es", label: "Español" },
    { code: "ru", label: "Русский" },
  ]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Language selector"
        title={`Current language: ${language.toUpperCase()}`}
      >
        <Globe className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-sm shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  language === lang.code
                    ? "bg-accent/10 text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                } ${lang.code !== languages[languages.length - 1].code ? "border-b border-border/30" : ""}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
