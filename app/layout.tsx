import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import { Toaster } from '@/app/(legacy)/components/ui/toaster'
import Head from 'next/head'
import Image from 'next/image'
import { GoogleAnalytics } from '@next/third-parties/google'
const font = Inter({ subsets: ['cyrillic'] })

export const metadata = {
  title: {
    template: '%s | Legacy Speaker',
    default: 'Legacy Speaker | 100% Karya Anak Bangsa',
  },
  description: 'Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!',
  keywords: 'Legacy, Legacy Speaker, Karya Anak Bangsa, Speaker Indonesia, Loudspeaker Indonesia, Car Speaker, Audio Mobil',
  openGraph: {
    title: 'Legacy Speaker | 100% Karya Anak Bangsa',
    description: 'Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!',
    url: 'https://legacy.us.com/',
    siteName: 'Legacy Speaker',
    images: [
       {
         url: 'https://legacy.us.com/images/legacy/logo_legacy.webp',
         width: 1200,
         height: 630,
         alt: 'Legacy Speaker | 100% Karya Anak Bangsa',
       },
      {
        url: 'https://legacy.us.com/images/legacy/logo_legacy.webp',
        width: 800,
        height: 800,
        alt: 'Legacy Speaker | 100% Karya Anak Bangsa',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legacy Speaker | 100% Karya Anak Bangsa',
    description: 'Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!',
    images: [
      {
        url: 'https://legacy.us.com/images/legacy/logo_legacy.webp',
        width: 800,
        height: 800,
        alt: 'Legacy Speaker | 100% Karya Anak Bangsa',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <Head>
        <link
          rel="preload"
          href="/images/legacy/navbarbg.webp"
          as="image"
        />
      </Head>
      <body className={`${font.className || ''} overflow-x-hidden`}>
      <Image src={'/images/legacy/navbarbg.webp'} alt="navbarbg" width={1920} height={1080} className='-z-10 fixed md:-top-64 sm:-top-24 -top-10 left-0' priority/>
          {children}
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-5HMPXRHGVL" />
    </html>
  )
}
