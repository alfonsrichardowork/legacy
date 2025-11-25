import { Metadata } from 'next';
import './globals.css'
import React from 'react'

// export async function generateMetadata(): Promise<Metadata> {
//   const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
//   return {
//     title: {
//       template: '%s | Legacy Speaker',
//       default: 'Legacy Speaker | 100% Karya Anak Bangsa',
//     },
//     description: 'Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!',
//     keywords: 'Legacy, Legacy Speaker, Karya Anak Bangsa, Speaker Indonesia, Loudspeaker Indonesia, Car Speaker, Audio Mobil',
//     openGraph: {
//       title: 'Legacy Speaker | 100% Karya Anak Bangsa',
//       description: 'Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!',
//       url: `${baseUrl}`,
//       siteName: 'Legacy Speaker',
//       images: [
//         {
//           url: `${baseUrl}/images/legacy/logo_legacy.webp`,
//           width: 1200,
//           height: 630,
//           alt: 'Legacy Speaker Logo',
//         },
//         {
//           url: `${baseUrl}/images/legacy/logo_legacy.webp`,
//           width: 800,
//           height: 800,
//           alt: 'Legacy Speaker Logo',
//         },
//       ],
//       locale: 'id_ID',
//       type: 'website',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: 'Legacy Speaker | 100% Karya Anak Bangsa',
//       description: 'Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!',
//       images: [
//         {
//           url: `${baseUrl}/images/legacy/logo_legacy.webp`,
//           width: 800,
//           height: 800,
//           alt: 'Legacy Speaker Logo',
//         }
//       ],
//     },
//     alternates: {
//       canonical: `${baseUrl}`,
//     },
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//       },
//     },
//   }
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>{children}</>
  )
}
