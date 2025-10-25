import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
    title: 'About Us',
    description: 'Mengenal Ragam Speaker Legacy untuk Semua Kebutuhan Audio Mobil',
    keywords: 'Tentang kami, Tentang kami Legacy Speaker, About us, About us Legacy Speaker',
    openGraph: {
      title: 'About Us | Legacy Speaker',
      description: 'Mengenal Ragam Speaker Legacy untuk Semua Kebutuhan Audio Mobil',
      url: `${baseUrl}/about-us`,
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
      title: 'About Us | Legacy Speaker',
      description: 'Mengenal Ragam Speaker Legacy untuk Semua Kebutuhan Audio Mobil',
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
      canonical: `${baseUrl}/about-us`,
    },
  }
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
