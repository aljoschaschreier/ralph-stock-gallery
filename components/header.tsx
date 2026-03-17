"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"
import { MonogramLogo } from "./monogram-logo"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language } = useLanguage()

  const navItems = [
    { label: t("nav.works", language), href: "/gallery" },
    { label: t("nav.about", language), href: "/about" },
    { label: t("nav.exhibitions", language), href: "/#exhibitions" },
    { label: t("nav.contact", language), href: "/#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <MonogramLogo className="h-[3.3rem] w-auto shrink-0 text-foreground self-center ml-[4mm]" />
          <span className="flex flex-col items-start gap-0 -ml-[4mm]">
            <span className="font-serif text-2xl tracking-wide text-foreground leading-tight">
              {t("header.ralph", language)}
            </span>
            <span className="font-serif text-xs tracking-widest uppercase text-muted-foreground">
              {t("header.subtitle", language)}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm tracking-wide text-muted-foreground transition-all nav-button-3d hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pl-6 border-l border-border/30">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            type="button"
            className="text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
