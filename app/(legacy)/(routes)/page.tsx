import Hero from './components/Hero';
import Series from './components/Series';
import History from './components/History';
import Youtube from './components/Youtube';
import News from './components/news';
import Distributor from './components/distributor';
import Head from 'next/head';
import Keunggulan from './components/keunggulan';

export default function LandingPageLegacy() {  
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Legacy Speaker",
    "url": "https://legacy.us.com",
    "logo": "https://legacy.us.com/images/legacy/logo_legacy.webp",
    "sameAs": [
      "https://www.instagram.com/legacy.speaker",
    ]
  };
  
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
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
