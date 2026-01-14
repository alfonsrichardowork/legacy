"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { superior } from '@prisma/client';

type PropType = {
  unggulan: superior[]
}

const SwiperCarouselKeunggulan: React.FC<PropType> = (props) => {
  const { unggulan } = props
  return (
    <Swiper
      slidesPerView={unggulan.length < 3 ? unggulan.length : 3}
      spaceBetween={10}
      modules={[FreeMode, Navigation, Autoplay]}
      className="mySwiper"
      loop={true}
      // navigation={true}    
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      data-testid="swiper-carousel-keunggulan"
      // style={{
      //   //@ts-ignore
      //   "--swiper-navigation-color": "#ee3239",
      //   "--swiper-navigation-size": "15px",
      //   "--swiper-navigation-sides-offset": "0px",
      // }}
    >
      {unggulan && unggulan.length > 0 && unggulan.map((val: superior, index) => 
        <SwiperSlide key={index} data-testid={`swiper-slide-keunggulan-${index}`}>
          <div className="flex flex-col items-center justify-center h-full">
            <Image src={val.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${val.url}` : val.url} alt={val.name} width={50} height={50} className="w-auto h-10" data-testid={`keunggulan-image-${index}`}/>
            <div className="pt-4">
              <p className="md:text-base text-sm text-black text-center line-clamp-1">
                {val.name}
              </p>
            </div>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}

export default SwiperCarouselKeunggulan