"use client"

import { superior } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import getAllSuperior from '../../actions/get-all-superior';
import FullScreenLoader from '../../components/loadingNoScroll';
import SwiperCarouselKeunggulan from '../../components/ui/swipercarouselkeunggulan';

const Keunggulan: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<superior[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const heroData: superior[] = await getAllSuperior();
        setValue(heroData);
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

      <div className="container mx-auto xl:px-36 lg:px-20 px-10 py-6 h-fit">


        <SwiperCarouselKeunggulan unggulan={value}/>

          {/* <div className='block gap-6'>
            <div className="overflow-hidden block h-full">
              <div className="flex flex-col items-center justify-center h-full">
                <Image src={`/images/legacy/indo_flag.webp`} alt="Bendera Indonesia" width={50} height={50} className="w-14 h-10 shadow-md" />
                <div className="pt-4">
                  <h2 className="md:text-xl text-base text-black text-center">
                    100% Karya Anak Bangsa
                  </h2>
                </div>
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default Keunggulan;
