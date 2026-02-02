import Footer from './components/footer'
import Navbar from './components/navbar'
import NextTopLoader from "nextjs-toploader";
import { Toaster } from './components/ui/toaster';
import ScrollToTop from './components/scrollToTop';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import '@/app/globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

const font = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
    title: {
      template: '%s | Legacy Speaker',
      default: 'Legacy Speaker | 100% Karya Anak Bangsa',
    },
    description: 'Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!',
    keywords: 'Legacy, Legacy Speaker, Karya Anak Bangsa, Speaker Indonesia, Loudspeaker Indonesia, Car Speaker, Audio Mobil',
    openGraph: {
      title: 'Legacy Speaker | 100% Karya Anak Bangsa',
      description: 'Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!',
      url: `${baseUrl}`,
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
      title: 'Legacy Speaker | 100% Karya Anak Bangsa',
      description: 'Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!',
      images: [
        {
          url: `${baseUrl}/images/legacy/logo_legacy.webp`,
          width: 800,
          height: 800,
          alt: 'Legacy Speaker Logo',
        }
      ],
    },
    alternates: {
      canonical: `${baseUrl}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export default function RootlegacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
  <html lang="en">
    <head>
      <link
        rel="preload"
        as="image"
        href="/images/legacy/navbarbg.webp"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/legacy/footerbg.webp"
        fetchPriority="high"
      />
    </head>
    <body className={`${font.className || ''} overflow-x-hidden`}>
      <ScrollToTop />
      <div className='min-h-screen'>
        <NextTopLoader color='#f0ad4e' showSpinner={false}/>
        <div className="sticky top-0 z-50 bg-transparent bg-cover bg-center">
          <Navbar />
        </div>
        <div className="flex flex-col min-h-screen">
          <main className="grow">
            {children}
          </main>
          <Footer />
        </div>
      </div>
      <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
    </html>
  )
}
