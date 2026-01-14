import { featuredseries } from '@prisma/client';
import SwiperCarouselFeaturedSeries from '../../components/swipercarouselfeaturedseries';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';

export default function Series({featuredSeriesPromise}: {featuredSeriesPromise: Promise<featuredseries[]>}) {
  const featuredSeries = use(featuredSeriesPromise);
  return (
    <>
      <div className="lg:block hidden">
        <SwiperCarouselFeaturedSeries seri={featuredSeries} />
      </div>
      <div className="lg:hidden block">
        {featuredSeries.map((series, index) => (
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
    </>
  );
};