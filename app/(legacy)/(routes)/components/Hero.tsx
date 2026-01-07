import { FeaturedProducts } from '@/app/(legacy)/types';
import SwiperCarousel from '../../components/ui/swipercarousel';
import getAllFeaturedProducts from '../../actions/get-all-featured-products';
import { Suspense } from 'react';
import FullScreenLoader from '../../components/loadingNoScroll';

export async function Hero() {
  const featuredData: FeaturedProducts[] = await getAllFeaturedProducts();

  return (
        <>
          <div className="top-0 left-0 w-full z-10"> 
          <h2 className='sr-only'>Featured Products by Legacy Speakers!</h2>
          <div
            className="absolute inset-0 h-[90vh] bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/legacy/navbarbg.webp')",
            }}
          />
            {/* <Suspense fallback={<FullScreenLoader isVisible/>}> */}
              <SwiperCarousel slides={featuredData}/>
            {/* </Suspense> */}
          </div>
        </>  
  )
};

