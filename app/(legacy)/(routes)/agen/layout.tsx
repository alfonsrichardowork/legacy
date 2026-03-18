import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
    title: 'Agen',
    description: 'Temukan semua agen resmi Legacy Speaker di seluruh Indonesia',
    keywords: 'Agen Legacy Speaker, Agen Legacy Speaker Indonesia, Agen Surabaya Legacy Speaker, Agen Jakarta Legacy Speaker, Agen Malang Legacy Speaker, Agen Bandung Legacy Speaker, Agen Pati Legacy Speaker',
    openGraph: {
      title: 'Agen | Legacy Speaker',
      description: 'Temukan semua agen resmi Legacy Speaker di seluruh Indonesia',
      url: `${baseUrl}/agen`,
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
      title: 'Agen | Legacy Speaker',
      description: 'Temukan semua agen resmi Legacy Speaker di seluruh Indonesia',
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
      canonical: `${baseUrl}/agen`,
    },
  }
}

export default function AgenLayout({
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
