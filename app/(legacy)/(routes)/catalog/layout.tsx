import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
    title: 'Catalog',
    description: 'Jelajahi katalog Legacy Speaker dan temukan beragam speaker berkualitas tinggi, dari tweeter hingga subwoofer',
    keywords: 'Catalog, Katalog, Catalog Legacy Speaker, Katalog Legacy Speaker',
    openGraph: {
      title: 'Catalog | Legacy Speaker',
      description: 'Jelajahi katalog Legacy Speaker dan temukan beragam speaker berkualitas tinggi, dari tweeter hingga subwoofer',
      url: `${baseUrl}/catalog`,
      siteName: 'Legacy Speaker',
      images: [
        {
          url: `${baseUrl}/images/legacy/logo_legacy.webp`,
          width: 1200,
          height: 630,
          alt: 'Legacy Speaker Logo',
        },
        {
          url: `${baseUrl}/images/legacy/logo_legacy.webp`,
          width: 800,
          height: 800,
          alt: 'Legacy Speaker Logo',
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
          url: `${baseUrl}/images/legacy/logo_legacy.webp`,
          width: 1200,
          height: 630,
          alt: 'Legacy Speaker Logo',
        }
      ],
    },
    alternates: {
      canonical: `${baseUrl}/catalog`,
    },
  }
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
