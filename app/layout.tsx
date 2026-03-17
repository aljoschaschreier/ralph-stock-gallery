import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { PageTransition } from '@/components/page-transition'
import { LanguageProvider } from '@/providers/language-provider'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ralph Stock | Contemporary Painter',
  description: 'Ralph Stock - Contemporary Paintings & Visual Art. Explore the portfolio of original oil paintings and mixed media artworks.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
