import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News',
  description: 'Dapatkan berita terbaru dari Legacy Speaker! Temukan informasi terkini tentang produk, inovasi, dan acara kami di sini!',
  keywords: 'News, Berita, News Legacy Speaker, Berita Legacy Speaker',
  openGraph: {
    title: 'News | Legacy Speaker',
    description: 'Dapatkan berita terbaru dari Legacy Speaker! Temukan informasi terkini tentang produk, inovasi, dan acara kami di sini!',
    url: 'https://legacy.us.com/news',
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
    title: 'News | Legacy Speaker',
    description: 'Dapatkan berita terbaru dari Legacy Speaker! Temukan informasi terkini tentang produk, inovasi, dan acara kami di sini!',
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

export default function NewsLayout({
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
