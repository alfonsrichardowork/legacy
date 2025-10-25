import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
    title: 'News',
    description: 'Dapatkan berita terbaru dari Legacy Speaker! Temukan informasi terkini tentang produk, inovasi, dan acara kami di sini!',
    keywords: 'News, Berita, News Legacy Speaker, Berita Legacy Speaker',
    openGraph: {
      title: 'News | Legacy Speaker',
      description: 'Dapatkan berita terbaru dari Legacy Speaker! Temukan informasi terkini tentang produk, inovasi, dan acara kami di sini!',
      url: `${baseUrl}/news`,
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
      title: 'News | Legacy Speaker',
      description: 'Dapatkan berita terbaru dari Legacy Speaker! Temukan informasi terkini tentang produk, inovasi, dan acara kami di sini!',
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
      canonical: `${baseUrl}/news`,
    }
  }
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
