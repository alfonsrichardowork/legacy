import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
    title: 'Distributors',
    description: 'Temukan semua distributor resmi Legacy Speaker di seluruh Indonesia',
    keywords: 'Distributors, Distributors Legacy Speaker, Distributors Legacy Speaker Indonesia, Distributors Surabaya Legacy Speaker, Distributors Jakarta Legacy Speaker, Distributors Malang Legacy Speaker, Distributors Bandung Legacy Speaker, Distributors Pati Legacy Speaker',
    openGraph: {
      title: 'Distributors | Legacy Speaker',
      description: 'Temukan semua distributor resmi Legacy Speaker di seluruh Indonesia',
      url: `${baseUrl}/distributors`,
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
      title: 'Distributors | Legacy Speaker',
      description: 'Temukan semua distributor resmi Legacy Speaker di seluruh Indonesia',
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
      canonical: `${baseUrl}/distributors`,
    },
  }
}

export default function DistributorsLayout({
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
