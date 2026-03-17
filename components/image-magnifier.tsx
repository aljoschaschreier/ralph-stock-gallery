"use client"

import * as React from "react"

const HOVER_DELAY_MS = 250
const LENS_SIZE_PX = 144 // 20% larger than original 120px
const ZOOM = 2.5

interface ImageMagnifierProps {
  imageSrc: string
  children: React.ReactNode
}

export function ImageMagnifier({ imageSrc, children }: ImageMagnifierProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const [showLens, setShowLens] = React.useState(false)
  const [lensRevealed, setLensRevealed] = React.useState(false)
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 })
  const [rect, setRect] = React.useState<DOMRect | null>(null)
  const [hasHoverDevice, setHasHoverDevice] = React.useState(false)

  React.useEffect(() => {
    if (!showLens) {
      setLensRevealed(false)
      return
    }
    const id = requestAnimationFrame(() => setLensRevealed(true))
    return () => cancelAnimationFrame(id)
  }, [showLens])

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setHasHoverDevice(mq.matches)
    const handler = () => setHasHoverDevice(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const clearHoverTimeout = React.useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }, [])

  const handleMouseEnter = React.useCallback(() => {
    if (!hasHoverDevice) return
    clearHoverTimeout()
    hoverTimeoutRef.current = setTimeout(() => {
      hoverTimeoutRef.current = null
      if (containerRef.current) {
        setRect(containerRef.current.getBoundingClientRect())
        setShowLens(true)
      }
    }, HOVER_DELAY_MS)
  }, [hasHoverDevice, clearHoverTimeout])

  const handleMouseLeave = React.useCallback(() => {
    clearHoverTimeout()
    setShowLens(false)
    setRect(null)
  }, [clearHoverTimeout])

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasHoverDevice || !containerRef.current) return
      const r = containerRef.current.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      setMouse({ x, y })
      if (showLens) setRect(r)
    },
    [hasHoverDevice, showLens]
  )

  React.useEffect(() => clearHoverTimeout, [clearHoverTimeout])

  const half = LENS_SIZE_PX / 2
  const lensLeft = mouse.x - half
  const lensTop = mouse.y - half

  const displayW = rect?.width ?? 1
  const displayH = rect?.height ?? 1
  const bgSizeW = displayW * ZOOM
  const bgSizeH = displayH * ZOOM
  const bgPosX = -(mouse.x * ZOOM - half)
  const bgPosY = -(mouse.y * ZOOM - half)

  return (
    <div
      ref={containerRef}
      className={`relative ${showLens && hasHoverDevice ? "cursor-none" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
      {showLens && hasHoverDevice && rect && (
        <div
          className={`pointer-events-none absolute z-10 rounded-full border border-white/50 bg-background/5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-opacity duration-200 ease-out ${lensRevealed ? "opacity-100" : "opacity-0"}`}
          style={{
            width: LENS_SIZE_PX,
            height: LENS_SIZE_PX,
            left: lensLeft,
            top: lensTop,
          }}
          aria-hidden
        >
          <div
            className="h-full w-full overflow-hidden rounded-full"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${bgSizeW}px ${bgSizeH}px`,
              backgroundPosition: `${bgPosX}px ${bgPosY}px`,
            }}
          />
        </div>
      )}
    </div>
  )
}
