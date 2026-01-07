import { superior } from '@prisma/client';
import getAllSuperior from '../../actions/get-all-superior';
import SwiperCarouselKeunggulan from '../../components/ui/swipercarouselkeunggulan';
import { Suspense } from 'react';
import FullScreenLoader from '../../components/loadingNoScroll';

export async function Keunggulan() {
  const heroData: superior[] = await getAllSuperior();
  return (
    <div className="relative w-full h-fit bg-white">
      <div className="container mx-auto xl:px-36 lg:px-20 px-10 py-6 h-fit">
        {/* <Suspense fallback={<FullScreenLoader isVisible/>}> */}
          <SwiperCarouselKeunggulan unggulan={heroData}/>
        {/* </Suspense> */}
      </div>
    </div>
  );
};