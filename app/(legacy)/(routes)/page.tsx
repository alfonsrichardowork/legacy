export const dynamic = "force-dynamic";

import Series from './components/Series';
import History from './components/History';
import { Youtube } from './components/Youtube';
import News from './components/news';
import { Distributor } from './components/distributor';
import Keunggulan from './components/keunggulan';
import Hero from './components/Hero';
import { Suspense } from 'react';
import getAllFeaturedProducts from '../actions/get-all-featured-products';
import { Loader } from '../components/ui/loader';
import { Separator } from '@/components/ui/separator';
import getAllFeaturedSeries from '../actions/get-all-featured-series';
import getAllNews from '../actions/get-all-news';
import getAboutUs from '../actions/get-about-us';
import getAllSuperior from '../actions/get-all-superior';

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
  const allHeroPromise = getAllFeaturedProducts()
  const featuredSeriesPromise = getAllFeaturedSeries();
  const allNewsPromise = getAllNews("3");
  const historyDataPromise = getAboutUs();
  const superiorPromise = getAllSuperior();
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className='sr-only'>Welcome to Legacy Speaker Official Website!</h1>
      
      <div className="top-0 left-0 w-full z-10 lg:h-126 md:h-106 h-130"> 
        <h2 className='sr-only'>Featured Products by Legacy Speakers!</h2>
        <div
          className="absolute inset-0 top-0 h-[90vh] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/legacy/navbarbg.webp')",
          }}
        />
        <Suspense fallback={<div className='h-full w-full flex items-center justify-center'><Loader/></div>}>
          <Hero allHeroPromise={allHeroPromise} />
        </Suspense>
      </div>
      

      <div className="relative w-full bg-white">
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pt-8 lg:pt-6 pt-4 items-center text-center h-24">
          <h2 className="text-3xl font-bold text-black pb-4">PILIH SPEAKER ANDA</h2>
          <Separator className="bg-foreground w-56 h-2 mx-auto" />
        </div>
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pb-4 pb-2 pt-2 lg:h-44 h-124">
          <Suspense fallback={<div className='h-full w-full flex items-center justify-center'><Loader/></div>}>
            <Series featuredSeriesPromise={featuredSeriesPromise} />
          </Suspense>
        </div>
      </div>


      <div className="relative w-full h-fit bg-slate-100">
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pt-8 lg:pt-6 pt-4 h-fit items-start block text-start">
          <h2 className="text-3xl font-bold text-black pb-4 w-full flex justify-center">BERITA TERBARU</h2>
          <Separator className="bg-foreground w-56 h-2 mx-auto" />
          <div className='lg:h-150 md:h-124 h-150'>
            <Suspense fallback={<div className='h-full w-full flex items-center justify-center'><Loader/></div>}>
              <News allNewsPromise={allNewsPromise} />
            </Suspense>
          </div>
        </div>
      </div>




      <div className="relative w-full bg-white h-full">
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 md:py-4 py-12 md:flex block items-center md:h-130 h-230">
          <Suspense fallback={<div className='h-full w-full flex items-center justify-center'><Loader/></div>}>
            <History historyDataPromise={historyDataPromise} />
          </Suspense>
        </div>
      </div>



      
      <div className="relative w-full bg-slate-100 z-10 lg:h-174 md:h-134 sm:h-174 h-200">
        <Youtube />
      </div>



      
      <div className="relative w-full md:h-32 h-30 bg-white">
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 py-6 h-full">
          <Suspense fallback={<div className='h-full w-full flex items-center justify-center'><Loader/></div>}>
            <Keunggulan superiorPromise={superiorPromise} />
          </Suspense>
        </div>
      </div>




      <div className="relative w-full bg-slate-100 lg:h-66 h-60">
        <Distributor />
      </div>
    </>
  );
}
