import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '../../../../components/ui/separator';
import { brand } from '@prisma/client';
import DompurifyContent from '../../components/dompurifyText';
import { use } from 'react';
import Image from 'next/image';

export default function History({historyDataPromise}: {historyDataPromise: Promise<brand>}) {
  const historyData = use(historyDataPromise);
  return (
    historyData &&
    <div className='md:flex block items-center'>
      {historyData.imgHomePage &&
        <div className='h-full w-fit'>
          <Image
            src={historyData.imgHomePage.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${historyData.imgHomePage}` : historyData.imgHomePage}
            alt='Tentang Legacy Speaker'
            width={500}
            height={300}
            className='h-125 w-auto z-10'
          />
        </div>
      }
      <div className='md:pl-8 md:w-3/5 w-full'>
        <h2 className='text-3xl font-bold text-black mb-4 md:pt-0 pt-8 line-clamp-1'>
          TENTANG KAMI
        </h2>
        <Separator className='bg-foreground w-56 h-2'/>
          {historyData.descHomePage &&
            <h3 className='my-4 text-black pr-4 md:w-4/5 w-full md:line-clamp-none line-clamp-7'>
              <DompurifyContent text={historyData.descHomePage}/>
            </h3>
          }
        <Button asChild variant={'secondary'} className='md:w-fit w-full'>
          <Link href="/about-us" className='text-white font-extrabold'>ABOUT US</Link>
        </Button>
      </div>
    </div>
  );
}