import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Mengenal Ragam Speaker Legacy untuk Semua Kebutuhan Audio Mobil',
  keywords: 'Tentang kami, Tentang kami Legacy Speaker, About us, About us Legacy Speaker',
  openGraph: {
    title: 'About Us | Legacy Speaker',
    description: 'Mengenal Ragam Speaker Legacy untuk Semua Kebutuhan Audio Mobil',
    url: 'https://legacy.us.com/about-us',
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
    title: 'About Us | Legacy Speaker',
    description: 'Mengenal Ragam Speaker Legacy untuk Semua Kebutuhan Audio Mobil',
    images: [
      {
        url: 'https://legacy.us.com/images/legacy/logo_legacy.webp',
        width: 1200,
        height: 630,
        alt: 'Legacy Speaker | 100% Karya Anak Bangsa',
      }
    ],
  },
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
