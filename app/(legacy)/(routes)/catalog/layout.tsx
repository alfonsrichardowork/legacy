import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Jelajahi katalog Legacy Speaker dan temukan beragam speaker berkualitas tinggi, dari tweeter hingga subwoofer',
  keywords: 'Catalog, Katalog, Catalog Legacy Speaker, Katalog Legacy Speaker',
  openGraph: {
    title: 'Catalog | Legacy Speaker',
    description: 'Jelajahi katalog Legacy Speaker dan temukan beragam speaker berkualitas tinggi, dari tweeter hingga subwoofer',
    url: 'https://legacy.us.com/catalog',
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
    title: 'Catalog | Legacy Speaker',
    description: 'Jelajahi katalog Legacy Speaker dan temukan beragam speaker berkualitas tinggi, dari tweeter hingga subwoofer',
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

export default function CatalogLayout({
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
