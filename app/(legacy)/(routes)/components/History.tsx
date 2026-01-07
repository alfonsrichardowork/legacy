import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '../../../../components/ui/separator';
import { Suspense } from 'react';
import { Brand } from '@prisma/client';
import getAboutUs from '../../actions/get-about-us';
import DompurifyContent from '../../components/dompurifyText';
import { LazyImageCustom } from '../../components/lazyImageCustom';
import FullScreenLoader from '../../components/loadingNoScroll';

export async function History() {
  const historyData: Brand = await getAboutUs();
  return (
    <div className="relative w-full h-fit bg-white">
     <div className="container mx-auto xl:px-36 lg:px-20 px-10 md:py-4 py-12 h-fit md:flex block items-center">
            {historyData.imgHomePage &&
        <div className='h-full w-fit'>
          {/* <Suspense fallback={<FullScreenLoader isVisible/>}> */}
              <LazyImageCustom
                src={historyData.imgHomePage.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${historyData.imgHomePage}` : historyData.imgHomePage}
                alt='Tentang Legacy Speaker'
                width={500}
                height={300}
                classname='max-h-125 w-auto z-10'
              />
          {/* </Suspense> */}
        </div>
            }
        <div className='md:pl-8 md:w-3/5 w-full'>
          <h2 className='text-3xl font-bold text-black pb-4 md:pt-0 pt-16'>
            TENTANG KAMI
          </h2>
          <Separator className='bg-foreground w-56 h-2'/>
            {historyData.descHomePage &&
              <h3 className='py-4 text-black pr-4 md:w-4/5 w-full'>
                {/* <Suspense fallback={<FullScreenLoader isVisible/>}> */}
                <DompurifyContent text={historyData.descHomePage}/>
                {/* </Suspense> */}
              </h3>
            }
          <Button asChild variant={'secondary'} className='md:w-fit w-full'>
            <Link href="/about-us" className='text-white font-extrabold'>ABOUT US</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}