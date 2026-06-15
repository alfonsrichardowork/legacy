import { Youtube } from './components/Youtube';
import { Agen } from './components/agen';
import { Suspense } from 'react';
import { Loader } from '../components/ui/loader';
import { Separator } from '@/components/ui/separator';
import prismadb from '@/lib/prismadb';
import SwiperCarousel from '../components/swipercarousel';
import Link from 'next/link';
import SwiperCarouselFeaturedSeries from '../components/swipercarouselfeaturedseries';
import Image from 'next/image';
import DompurifyContent from '../components/dompurifyText';
import { Button } from '@/components/ui/button';
import SwiperCarouselNews from '../components/swipercarouselnews';
import SwiperCarouselKeunggulan from '../components/swipercarouselkeunggulan';

export default async function LandingPageLegacy() {  
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
  const featuredProducts = await prismadb.product.findMany({
    where: {
      isFeatured: true,
      isArchived: false,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      featuredDesc: true,
      series: true,
      featured_img_url: true
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
  const series = await prismadb.featuredseries.findMany({});
  const allNews = await prismadb.news.findMany({
    select: {
      id: true, 
      title: true,
      slug: true,
      link_placeholder: true,
      link_url: true,
      description: true,
      event_date: true,
      updatedAt: true,
      news_img_url: true
    },
    orderBy: {
      event_date: 'desc',
    },
    take: 3
  });
  const about = await prismadb.brand.findFirst({});
  const superior = await prismadb.superior.findMany({});
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
        {featuredProducts &&
          <Suspense fallback={<div className='h-full w-full flex items-center justify-center'><Loader/></div>}>
            <SwiperCarousel slides={featuredProducts}/>
          </Suspense>
        }
      </div>
      

      <div className="relative w-full bg-white">
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pt-8 lg:pt-6 pt-4 items-center text-center h-24">
          <h2 className="text-3xl font-bold text-black pb-4">PILIH SPEAKER ANDA</h2>
          <Separator className="bg-foreground w-56 h-2 mx-auto" />
        </div>
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pb-4 pb-2 pt-2 lg:h-44 h-124">
          {series && 
            <Suspense fallback={<div className='h-full w-full flex items-center justify-center'><Loader/></div>}>
            <div className="lg:block hidden">
              <SwiperCarouselFeaturedSeries seri={series} />
            </div>
            <div className="lg:hidden block">
              {series.map((series, index) => (
                <Link key={index} href={series.href} className="group cursor-pointer relative">
                  <div className="rounded-lg border shadow-lg overflow-hidden flex flex-row my-3 h-36">
                    <Image
                      src={
                        series.img.startsWith("/uploads/")
                          ? `${process.env.NEXT_PUBLIC_ROOT_URL}${series.img}`
                          : series.img
                      }
                      alt={series.alt}
                      width={1000}
                      height={1000}
                      className="object-cover aspect-4/3 lg:w-1/2 sm:w-1/4 w-7/12 order-2"
                      placeholder="blur"
                      priority
                      blurDataURL="data:image/webp;base64,[base64-encoded-string]"
                    />
                    <div className="p-4 grow flex flex-col order-1">
                      <h3 className="font-bold text-xl text-secondary">
                        {series.name}
                      </h3>
                      <h4 className="text-sm text-black">
                        {series.desc}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            </Suspense>
          }
        </div>
      </div>


      <div className="relative w-full h-fit bg-slate-100">
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pt-8 lg:pt-6 pt-4 h-fit items-start block text-start">
          <h2 className="text-3xl font-bold text-black pb-4 w-full flex justify-center">BERITA TERBARU</h2>
          <Separator className="bg-foreground w-56 h-2 mx-auto" />
          <div className='lg:h-150 md:h-124 h-150'>
            {allNews && allNews.length > 0 &&
              <Suspense fallback={<div className='h-full w-full flex items-center justify-center'><Loader/></div>}>
                <div className="pt-4 h-full md:grid md:grid-cols-3 items-center hidden">
                  {allNews.map((value, index) => (
                    <div
                      className={`${
                        index === 0
                          ? "pr-4"
                          : index === allNews.length - 1
                          ? "pl-4"
                          : "px-2"
                      } h-full`}
                      key={index}
                    >
                      {value.news_img_url !== '' &&
                        <Image
                          src={value.news_img_url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${value.news_img_url}` : value.news_img_url}
                          alt={value.title}
                          width={500}
                          height={500}
                          className="w-fit lg:h-[300px] h-[200px] mx-auto rounded-xl"
                          loading="lazy"
                        />
                      }
                      <h3 className="text-2xl font-bold text-black w-full line-clamp-2 my-4">
                        {value.title}
                      </h3>
                      <h4
                        className="text-black w-full line-clamp-4 my-4"
                      >
                        <DompurifyContent text={value.description}/>
                      </h4>
                      <div className="items-start pb-4 pt-2">
                        <Button asChild size={"lg"} variant={"secondary"}>
                          <Link
                            href={`/news/${value.slug}`}
                            className="text-white font-bold"
                          >
                            READ MORE
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 md:hidden block">
                  <SwiperCarouselNews news={allNews} />
                </div>      
              </Suspense>
            }
          </div>
        </div>
      </div>




      <div className="relative w-full bg-white h-full">
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 md:py-4 py-12 md:flex block items-center md:h-130 h-230">
          {about &&
            <Suspense fallback={<div className='h-full w-full flex items-center justify-center'><Loader/></div>}>
            
              <div className='md:flex block items-center'>
                {about.imgHomePage &&
                  <div className='h-full w-fit'>
                    <Image
                      src={about.imgHomePage.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${about.imgHomePage}` : about.imgHomePage}
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
                    {about.descHomePage &&
                      <h3 className='my-4 text-black pr-4 md:w-4/5 w-full md:line-clamp-none line-clamp-7'>
                        <DompurifyContent text={about.descHomePage}/>
                      </h3>
                    }
                  <Button asChild variant={'secondary'} className='md:w-fit w-full'>
                    <Link href="/about-us" className='text-white font-extrabold'>ABOUT US</Link>
                  </Button>
                </div>
              </div>
            </Suspense>
          }
        </div>
      </div>



      
      <div className="relative w-full bg-slate-100 z-10 lg:h-174 md:h-134 sm:h-174 h-200">
        <Youtube />
      </div>



      
      <div className="relative w-full md:h-32 h-30 bg-white">
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 py-6 h-full">
          {superior &&
            <Suspense fallback={<div className='h-full w-full flex items-center justify-center'><Loader/></div>}>
              <SwiperCarouselKeunggulan unggulan={superior}/>
            </Suspense>
          }
        </div>
      </div>




      <div className="relative w-full bg-slate-100 lg:h-66 h-60">
        <Agen />
      </div>
    </>
  );
}
