import { Separator } from '../../../../components/ui/separator';
import { Suspense } from 'react';
import { featuredseries } from '@prisma/client';
import getAllFeaturedSeries from '../../actions/get-all-featured-series';
import FullScreenLoader from '../../components/loadingNoScroll';
import { FeaturedSeriesClient } from './seriesClient';

export async function Series() {
    const featuredSeries: featuredseries[] = await getAllFeaturedSeries();
  return (
    <div className="relative w-full h-fit bg-white">
      <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pt-8 lg:pt-6 pt-4 items-center text-center h-24">
        <h2 className="text-3xl font-bold text-black pb-4">PILIH SPEAKER ANDA</h2>
        <Separator className="bg-foreground w-56 h-2 mx-auto" />
      </div>

      <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pb-4 pb-2 pt-2 h-fit">
        {/* <Suspense fallback={<div className='h-24 w-full'/>}> */}
          <FeaturedSeriesClient seri={featuredSeries} />
        {/* </Suspense> */}
      </div>
    </div>
  );
};