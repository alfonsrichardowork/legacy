import { Metadata } from "next"

 
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
    title: 'All Drivers',
    description: 'Jelajahi berbagai driver speaker Legacy Speaker, dari tweeter hingga subwoofer, dengan kualitas terbaik untuk kebutuhan audio Anda!',  
    keywords: 'Drivers, Semua drivers, All Drivers, Semua drivers legacy speaker, All legacy speaker drivers',
    openGraph: {
      title: 'All Drivers | Legacy Speaker',
      description: 'Jelajahi berbagai driver speaker Legacy Speaker, dari tweeter hingga subwoofer, dengan kualitas terbaik untuk kebutuhan audio Anda!',
      url: `${baseUrl}/drivers`,
      siteName: 'Legacy Speaker',
      images: [
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
      title: 'All Drivers | Legacy Speaker',
      description: 'Jelajahi berbagai driver speaker Legacy Speaker, dari tweeter hingga subwoofer, dengan kualitas terbaik untuk kebutuhan audio Anda!',
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
      canonical: `${baseUrl}/drivers`,
    },
  }
}

export default function DriversLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return(
        <div className="container mx-auto xl:px-36 lg:px-20 px-10">
          {children}
        </div>
    )
}