import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ productSlugs: string }>
}
 
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const slugs = decodeURIComponent(params.productSlugs); 
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
  title: 'Comparison | Legacy Speaker',
  description: 'Bandingkan produk Legacy Speaker yang telah Anda pilih untuk menemukan pilihan terbaik.',
    keywords: 'Comparison Legacy Speaker, Perbandingan Legacy Speaker',
    openGraph: {
      title: 'Comparison | Legacy Speaker',
      description: 'Bandingkan produk Legacy Speaker yang telah Anda pilih untuk menemukan pilihan terbaik.',
      url: `${baseUrl}/comparison/${slugs}`,
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
      title: 'Comparison | Legacy Speaker',
      description: 'Bandingkan produk Legacy Speaker yang telah Anda pilih untuk menemukan pilihan terbaik.',
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
      canonical: `${baseUrl}/comparison/${slugs}`,
    },
  }
}

export default function ComparisonPageLayout({
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
