import { NextResponse } from "next/server"
import { translations } from "@/lib/translations"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const lang = url.searchParams.get("lang") || "en"

  // Validate language parameter
  const validLangs = ["en", "de", "fr", "it", "es", "ru"]
  const language = validLangs.includes(lang) ? (lang as keyof typeof translations) : "en"

  const t = (key: string) => {
    return (translations[language] as Record<string, string>)[key] || key
  }

  const shows = [
    { year: "2024", venue: "Schloss Oberschwappach, Bavaria" },
    { year: "2023", venue: "Kunstforum Forst, Berlin" },
    { year: "2022", venue: "Künstlerbund Speyer" },
    { year: "2021", venue: "Galerie Neumann, Karlsruhe" },
    { year: "2020", venue: "Kunstverein Speyer" },
    { year: "2019", venue: "Schloss Oberschwappach, Bavaria" },
    { year: "2018", venue: "Kunstforum Forst, Berlin" },
    { year: "2017", venue: "Künstlerbund Speyer" },
    { year: "2016", venue: "Galerie Neumann, Karlsruhe" },
    { year: "2015", venue: "Kunstverein Speyer" },
  ]

  const acquisitions = [
    { year: "2020", venue: "Staatsgalerie Karlsruhe" },
    { year: "2018", venue: "Kunstmuseum Stuttgart" },
    { year: "2015", venue: "Saarlandmuseum" },
    { year: "2012", venue: "Kurpfälzisches Museum Heidelberg" },
  ]

  const cvText = `
═══════════════════════════════════════════════════════════════════════════════
                                 RALPH STOCK
                             ${t("header.subtitle")}
═══════════════════════════════════════════════════════════════════════════════

${t("cv.born")}
${t("cv.lives")}
${t("cv.member")}


───────────────────────────────────────────────────────────────────────────────
                            ${t("cv.shows")}
───────────────────────────────────────────────────────────────────────────────

${shows.map(s => `${s.year}    ${s.venue}`).join("\n")}


───────────────────────────────────────────────────────────────────────────────
                            ${t("cv.acquisitions")}
───────────────────────────────────────────────────────────────────────────────

${acquisitions.map(a => `${a.year}    ${a.venue}`).join("\n")}


───────────────────────────────────────────────────────────────────────────────
                              ${t("cv.awards")}
───────────────────────────────────────────────────────────────────────────────

2016    ${t("cv.award2016")}


═══════════════════════════════════════════════════════════════════════════════

For inquiries about exhibitions, acquisitions, or commissions:
mail@ralphstock.com

═══════════════════════════════════════════════════════════════════════════════
`

  return new NextResponse(cvText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename=Ralph_Stock_CV_${language.toUpperCase()}.txt`,
    },
  })
}
