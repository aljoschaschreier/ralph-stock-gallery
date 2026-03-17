"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const exhibitions = [
  {
    name: "Kunstforum Forst",
    year: "2016",
    images: [
      "https://static.wixstatic.com/media/05a4d7_9cd417210db34656a055e7e6ccf96f78~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1960,h_1336,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/05a4d7_9cd417210db34656a055e7e6ccf96f78~mv2_d_3264_2448_s_4_2.jpg",
      "https://static.wixstatic.com/media/05a4d7_895f74d31cd346d1be72e8b99b6d775b~mv2_d_5184_3456_s_4_2.jpg/v1/fill/w_1960,h_1344,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/05a4d7_895f74d31cd346d1be72e8b99b6d775b~mv2_d_5184_3456_s_4_2.jpg",
      "https://static.wixstatic.com/media/05a4d7_da024d391142466b90ba23db5aaa817c~mv2_d_5184_3456_s_4_2.jpg/v1/fill/w_1960,h_1344,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/05a4d7_da024d391142466b90ba23db5aaa817c~mv2_d_5184_3456_s_4_2.jpg",
    ],
  },
  {
    name: "Kunstverein Speyer",
    year: "2015",
    images: [
      "https://static.wixstatic.com/media/05a4d7_508e9946f1ba4f4d9b70a1811167a420~mv2.jpg/v1/fill/w_1188,h_793,al_c,q_85,enc_avif,quality_auto/05a4d7_508e9946f1ba4f4d9b70a1811167a420~mv2.jpg",
      "https://static.wixstatic.com/media/05a4d7_886034bb828b4cc8995ce87cc21d101c~mv2.jpg/v1/fill/w_1500,h_1001,al_c,q_85,enc_avif,quality_auto/05a4d7_886034bb828b4cc8995ce87cc21d101c~mv2.jpg",
      "https://static.wixstatic.com/media/05a4d7_360ce9523c1847ab80716fa95510753a~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1960,h_1308,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/05a4d7_360ce9523c1847ab80716fa95510753a~mv2_d_3264_2448_s_4_2.jpg",
    ],
  },
  {
    name: "Schloss Oberschwappach",
    year: "2013",
    images: [
      "https://static.wixstatic.com/media/05a4d7_f80e828d258442cb8ac1dbf79983eb22~mv2_d_5472_3648_s_4_2.jpg/v1/fill/w_1960,h_1254,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/05a4d7_f80e828d258442cb8ac1dbf79983eb22~mv2_d_5472_3648_s_4_2.jpg",
      "https://static.wixstatic.com/media/05a4d7_03f26a3af5984e6bb6dd1b94011bbcee~mv2_d_5472_3648_s_4_2.jpg/v1/fill/w_1960,h_1254,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/05a4d7_03f26a3af5984e6bb6dd1b94011bbcee~mv2_d_5472_3648_s_4_2.jpg",
      "https://static.wixstatic.com/media/05a4d7_6ea0afa4c9834f7fb0960ee6d37c30cd~mv2_d_5472_3648_s_4_2.jpg/v1/fill/w_1960,h_1254,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/05a4d7_6ea0afa4c9834f7fb0960ee6d37c30cd~mv2_d_5472_3648_s_4_2.jpg",
    ],
  },
]

// Flatten all images with their exhibition info
const allSlides = exhibitions.flatMap((exhibition) =>
  exhibition.images.map((image) => ({
    image,
    name: exhibition.name,
    year: exhibition.year,
  }))
)

export function ExhibitionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allSlides.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allSlides.length) % allSlides.length)
  }, [])

  useEffect(() => {
    if (isPaused) return

    // 3 seconds for first image, 4 seconds for subsequent
    const delay = currentIndex === 0 ? 3000 : 4000
    const timer = setTimeout(goToNext, delay)

    return () => clearTimeout(timer)
  }, [currentIndex, isPaused, goToNext])

  const currentSlide = allSlides[currentIndex]

  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider Container */}
      <div className="relative overflow-hidden rounded-md" style={{ boxShadow: '0 12px 48px -8px rgba(0,0,0,0.24), 0 4px 16px -4px rgba(0,0,0,0.12)' }}>
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {allSlides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="relative w-full" style={{ aspectRatio: '3/2' }}>
                <Image
                  src={slide.image}
                  alt={`${slide.name} ${slide.year}`}
                  fill
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:bg-background transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:bg-background transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Caption */}
      <div className="text-center mt-6">
        <p className="font-serif text-lg text-foreground italic">
          {currentSlide.name}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {currentSlide.year}
        </p>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {allSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-foreground w-4"
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
