import Hero from './components/Hero';
import Series from './components/Series';
import History from './components/History';
import Youtube from './components/Youtube';
import News from './components/news';
import Distributor from './components/distributor';
import Keunggulan from './components/keunggulan';

export default function LandingPageLegacy() {  
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
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
      <Hero />
      <Series />
      <News/>
      <History />
      <Youtube />
      <Keunggulan />
      <Distributor />
    </>
  );
}
