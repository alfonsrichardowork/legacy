import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
    title: 'Contact Us',
    description: 'Hubungi Legacy Speaker untuk informasi lebih lanjut!',
    keywords: 'Contact us, Hubungi Kami Legacy Speaker, Hubungi kami, Hubungi kami Legacy Speaker',
    openGraph: {
      title: 'Contact Us | Legacy Speaker',
      description: 'Hubungi Legacy Speaker untuk informasi lebih lanjut!',
      url: `${baseUrl}/contact`,
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
      title: 'Contact Us | Legacy Speaker',
      description: 'Hubungi Legacy Speaker untuk informasi lebih lanjut!',
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
      canonical: `${baseUrl}/contact`,
    },
  }
}

export default function ContactUsLayout({
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
