import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Hubungi Legacy Speaker untuk informasi lebih lanjut!',
  keywords: 'Contact us, Hubungi Kami Legacy Speaker, Hubungi kami, Hubungi kami Legacy Speaker',
  openGraph: {
    title: 'Contact Us | Legacy Speaker',
    description: 'Hubungi Legacy Speaker untuk informasi lebih lanjut!',
    url: 'https://legacy.us.com/contact',
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
    title: 'Contact Us | Legacy Speaker',
    description: 'Hubungi Legacy Speaker untuk informasi lebih lanjut!',
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
