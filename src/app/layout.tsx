/* eslint-disable @next/next/no-page-custom-font, @next/next/google-font-display */
import type { Metadata } from 'next'
import { SITE } from '../../constants/site'
import './globals.css'

export const metadata: Metadata = {
  title: 'RAJIV // MULTIVERSAL ARCHITECT',
  description: `Portfolio of ${SITE.name}: ${SITE.tagline}`,
  openGraph: {
    title: 'RAJIV // MULTIVERSAL ARCHITECT',
    description: SITE.tagline,
    url: 'https://rajiv-portfolio.vercel.app',
    siteName: 'Rajiv Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAJIV // MULTIVERSAL ARCHITECT',
    description: SITE.tagline,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Bangers&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className="bg-background text-on-background font-body min-h-screen overflow-x-hidden selection:bg-primary-container selection:text-white">
        {children}
      </body>
    </html>
  )
}
