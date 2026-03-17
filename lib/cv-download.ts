"use client"

export async function downloadCV(language: string = "en") {
  try {
    const response = await fetch(`/api/cv/download?lang=${language}`, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Failed to download CV")
    }

    // Get the blob from the response
    const blob = await response.blob()

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob)

    // Create a temporary anchor element and click it
    const a = document.createElement("a")
    a.href = url
    a.download = `Ralph_Stock_CV_${language.toUpperCase()}.txt`
    document.body.appendChild(a)
    a.click()

    // Clean up
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error("Error downloading CV:", error)
  }
}
