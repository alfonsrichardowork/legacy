import { FeaturedProducts } from '@/app/(legacy)/types';
import SwiperCarousel from '../../components/swipercarousel';
import { use } from 'react';

export default function Hero({allHeroPromise} : {allHeroPromise: Promise<FeaturedProducts[]>}) {
  const featuredData = use(allHeroPromise);

  return (
    <>
      <SwiperCarousel slides={featuredData}/>
    </>  
  )
};

