export const dynamic = 'force-dynamic';
import { Series } from './components/Series';
import { History } from './components/History';
import { Youtube } from './components/Youtube';
import { News } from './components/news';
import { Distributor } from './components/distributor';
import { Keunggulan } from './components/keunggulan';
import { Hero } from './components/Hero';
import { Suspense } from 'react';
import FullScreenLoader from '../components/loadingNoScroll';

export default function LandingPageLegacy() {  
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Legacy Speaker",
    "url": `${baseUrl}`,
    "logo": `${baseUrl}/images/legacy/logo_legacy.webp`,
    "sameAs": [
      "https://www.instagram.com/legacy.speaker",
    ]
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className='sr-only'>Welcome to Legacy Speaker Official Website!</h1>
      
      <Suspense fallback={<></>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<></>}>
        <Series />
      </Suspense>
      <Suspense fallback={<></>}>
        <News />
      </Suspense>
      <Suspense fallback={<></>}>
        <History />
      </Suspense>
      <Youtube />
      <Suspense fallback={<></>}>
        <Keunggulan />
      </Suspense>
      <Distributor />
    </>
  );
}
