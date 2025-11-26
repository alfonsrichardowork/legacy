"use client"

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '../../../../components/ui/separator';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Brand } from '@prisma/client';
import getAboutUs from '../../actions/get-about-us';
import FullScreenLoader from '../../components/loadingNoScroll';
import DompurifyContent from '../../components/dompurifyText';
import { LazyImageCustom } from '../../components/lazyImageCustom';

const History: React.FC = () => {
  const [data, setData] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const distributorsData: Brand = await getAboutUs();
        setData(distributorsData);
      } catch (error) {
        console.error('Error fetching featured products:', error);
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
    data &&
    <div className="relative w-full h-fit bg-white">
     <div className="container mx-auto xl:px-36 lg:px-20 px-10 md:py-4 py-12 h-fit md:flex block items-center">
        <div className='h-full w-fit'>
          {data.imgHomePage &&
            <LazyImageCustom
              src={data.imgHomePage.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${data.imgHomePage}` : data.imgHomePage}
              alt='Tentang Legacy Speaker'
              width={500}
              height={300}
              classname='max-h-[500px] w-auto z-10'
            />
          }
        </div>
        <div className='md:pl-8 md:w-3/5 w-full'>
          <h2 className='text-3xl font-bold text-black pb-4 md:pt-0 pt-16'>
            TENTANG KAMI
          </h2>
          <Separator className='bg-foreground w-56 h-2'/>
          <h3 className='py-4 text-black pr-4 md:w-4/5 w-full'>
            {data.descHomePage &&
              <DompurifyContent text={data.descHomePage}/>
            }
          </h3>
          <Button asChild variant={'secondary'} className='md:w-fit w-full'>
            <Link href="/about-us" className='text-white font-extrabold'>ABOUT US</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default History;
