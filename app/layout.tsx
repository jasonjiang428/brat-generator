import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Brat Generator - Create Charli XCX Brat Album Cover Style Images | Free Online Tool",
  description:
    "Create custom images in the iconic Charli XCX Brat album cover style. Free online generator with real-time preview, high-quality PNG downloads, and support for 10 languages. No registration required.",
  keywords:
    "brat generator, charli xcx, brat album cover, image generator, meme generator, pop culture, lime green aesthetic, custom text generator, free online tool",
  authors: [{ name: "Brat Generator Team" }],
  creator: "Brat Generator",
  publisher: "Brat Generator",
  robots: "index, follow",
  openGraph: {
    title: "Brat Generator - Create Charli XCX Style Images",
    description:
      "Free online tool to create custom images in the iconic Charli XCX Brat album cover style. Real-time preview and high-quality downloads.",
    url: "https://brat-generator.com",
    siteName: "Brat Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brat Generator - Create Charli XCX Style Images",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brat Generator - Create Charli XCX Style Images",
    description: "Free online tool to create custom images in the iconic Charli XCX Brat album cover style.",
    images: ["/twitter-image.png"],
    creator: "@bratgenerator",
  },
  alternates: {
    canonical: "https://brat-generator.com",
    languages: {
      en: "https://brat-generator.com/en",
      "zh-CN": "https://brat-generator.com/zh-cn",
      "zh-TW": "https://brat-generator.com/zh-tw",
      ja: "https://brat-generator.com/ja",
      ko: "https://brat-generator.com/ko",
      es: "https://brat-generator.com/es",
      fr: "https://brat-generator.com/fr",
      de: "https://brat-generator.com/de",
      ru: "https://brat-generator.com/ru",
      ar: "https://brat-generator.com/ar",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8ACE00" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Brat Generator",
              description: "Create custom images in the iconic Charli XCX Brat album cover style",
              url: "https://brat-generator.com",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "Brat Generator Team",
              },
              about: {
                "@type": "MusicAlbum",
                name: "Brat",
                byArtist: {
                  "@type": "MusicGroup",
                  name: "Charli XCX",
                },
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
