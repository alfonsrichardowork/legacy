import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Distributors',
  description: 'Temukan semua distributor resmi Legacy Speaker di seluruh Indonesia',
  keywords: 'Distributors, Distributors Legacy Speaker, Distributors Legacy Speaker Indonesia, Distributors Surabaya Legacy Speaker, Distributors Jakarta Legacy Speaker, Distributors Malang Legacy Speaker, Distributors Bandung Legacy Speaker, Distributors Pati Legacy Speaker',
  openGraph: {
    title: 'Distributors | Legacy Speaker',
    description: 'Temukan semua distributor resmi Legacy Speaker di seluruh Indonesia',
    url: 'https://legacy.us.com/distributors',
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
    title: 'Distributors | Legacy Speaker',
    description: 'Temukan semua distributor resmi Legacy Speaker di seluruh Indonesia',
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
