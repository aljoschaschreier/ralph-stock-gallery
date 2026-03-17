'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Trigger fade-in on page load
    document.documentElement.style.opacity = '1'
  }, [pathname])

  return <>{children}</>
}
