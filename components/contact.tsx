"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/providers/language-provider"
import { t } from "@/lib/translations"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle")
  const { language } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitState("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send")
      }

      setSubmitState("success")
      setFormData({ name: "", email: "", message: "" })
    } catch {
      setSubmitState("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="px-6 py-32 lg:py-48">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-6 tracking-tight">
          {t("contact.title", language)}
        </h2>
        
        <p className="text-center text-muted-foreground leading-relaxed">
          {t("contact.description", language)}
        </p>
        <p className="text-center text-muted-foreground mb-20 leading-relaxed mt-2">
          {t("contact.note", language)}
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm tracking-wide text-foreground mb-3">
              {t("contact.name", language)}
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors"
              placeholder={t("contact.name", language)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm tracking-wide text-foreground mb-3">
              {t("contact.email", language)}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors"
              placeholder={t("contact.email-placeholder", language)}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm tracking-wide text-foreground mb-3">
              {t("contact.message", language)}
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors resize-none"
              placeholder={t("contact.message", language)}
              required
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-block border border-foreground px-10 py-3 text-sm tracking-widest uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {t("contact.send", language)}
            </button>
            {submitState === "success" ? (
              <p className="mt-4 text-sm text-foreground/80">{t("contact.sent", language)}</p>
            ) : null}
            {submitState === "error" ? (
              <p className="mt-4 text-sm text-destructive">{t("contact.error", language)}</p>
            ) : null}
          </div>
        </form>

        {/* CV Button */}
        <div className="text-center mt-16 pt-12 border-t border-border">
          <Link
            href="/cv"
            className="inline-block border border-foreground/40 px-10 py-3 text-sm tracking-widest uppercase text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            {t("cv.button", language)}
          </Link>
        </div>

      </div>
    </section>
  )
}
