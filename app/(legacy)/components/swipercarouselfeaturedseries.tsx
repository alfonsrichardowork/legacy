"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { featuredseries } from '@prisma/client';
import Link from 'next/link';

type PropType = {
  seri: featuredseries[]
}

const SwiperCarouselFeaturedSeries: React.FC<PropType> = (props) => {
  const { seri } = props
  return (
    <Swiper
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: Math.min(3, seri.length) },
      }}
      // slidesPerView={3}
      spaceBetween={10}
      modules={[FreeMode, Navigation, Autoplay]}
      className="mySwiper"
      loop={true}
      // navigation={true}    
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      data-testid="swiper-carousel-featured-series"
    >
      {seri && seri.length > 0 && seri.map((val: featuredseries, index) => 
        <SwiperSlide key={index} className=' my-4 shadow-lg rounded-lg' data-testid={`swiper-slide-featured-series-${index}`}>
          <Link key={index} href={val.href} className="group cursor-pointer relative rounded-lg" data-testid={`link-${val.name}`}>
            <div className="rounded-lg border overflow-hidden flex flex-row h-full">
              <Image
                src={val.img.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${val.img}` : val.img }
                alt={val.alt}
                width={1000}
                height={1000}
                className="object-cover aspect-4/3 lg:w-1/2 sm:w-1/4 w-7/12 order-2 h-auto bottom-0 right-0"
                placeholder="blur"
                priority
                blurDataURL="data:image/webp;base64,[base64-encoded-string]"
                data-testid={`featured-series-image-${index}`}
              />
              <div className="p-4 grow flex flex-col order-1">
                <h3 className="font-bold lg:text-4xl md:text-2xl text-xl text-secondary text-left">
                  {val.name}
                </h3>
                <h4 className="md:text-base text-sm text-black text-left ">
                  {val.desc}
                </h4>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      )}
    </Swiper>
  );
}

export default SwiperCarouselFeaturedSeries