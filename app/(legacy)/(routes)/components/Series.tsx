"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '../../../../components/ui/separator';
import { useEffect, useState } from 'react';
import { featuredseries } from '@prisma/client';
import getAllFeaturedSeries from '../../actions/get-all-featured-series';
import FullScreenLoader from '../../components/loadingNoScroll';
import SwiperCarouselFeaturedSeries from '../../components/ui/swipercarouselfeaturedseries';

const Series: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<featuredseries[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const featuredData: featuredseries[] = await getAllFeaturedSeries();
        setValue(featuredData);
      } catch (error) {
        console.error('Error fetching superiority:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  return (
    loading? 
      <FullScreenLoader isVisible={loading}/>
      :
    <div className="relative w-full h-fit bg-white">
      <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pt-8 lg:pt-6 pt-4 h-fit items-center text-center">
        <h2 className="text-3xl font-bold text-black pb-4">PILIH SPEAKER ANDA</h2>
        <Separator className="bg-foreground w-56 h-2 mx-auto" />
      </div>

      <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pb-4 pb-2 pt-2 h-fit">
        <div className='lg:block hidden'>
          <SwiperCarouselFeaturedSeries seri={value}/>
        </div>
        <div className='lg:hidden block'>
          {value.map((series, index) => (
            <Link key={index} href={series.href} className="group cursor-pointer relative">
              <div className="rounded-lg border shadow-lg overflow-hidden flex flex-row h-full my-3">
                <Image
                  src={series.img.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${series.img}` : series.img }
                  alt={series.alt}
                  width={1000}
                  height={1000}
                  className="object-cover aspect-4/3 lg:w-1/2 sm:w-1/4 w-7/12 order-2 h-auto bottom-0 right-0"
                  placeholder="blur"
                  priority
                  blurDataURL="data:image/webp;base64,[base64-encoded-string]"
                />
                <div className="p-4 grow flex flex-col order-1">
                  <h3 className="font-bold lg:text-4xl md:text-2xl text-xl text-secondary text-left">
                    {series.name}
                  </h3>
                  <h4 className="md:text-base text-sm text-black text-left ">
                    {series.desc}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Series;
