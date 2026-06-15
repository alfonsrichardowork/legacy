"use client"

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

//@ts-ignore
import 'swiper/css';
//@ts-ignore
import 'swiper/css/navigation';

// import required modules
import { Navigation, FreeMode } from 'swiper/modules';
import { Card, CardContent } from './ui/card';
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Captions from "yet-another-react-lightbox/plugins/captions";
import { useRef, useState } from 'react';
import { LazyImageCustom } from './lazyImageCustom';

type PropType = {
  drawing: string,
  graph: string,
  impedance: string,
  name: string
}

const SwiperCarouselGraphImpedance: React.FC<PropType> = (props) => {
  const { drawing, graph, impedance, name } = props
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }
  
  const slides = [
    drawing !== '' && { src: drawing, title: `${name} - Drawing`, alt: `${name} - Drawing` },
    graph !== '' && { src: graph, title: `${name} - Graph`, alt: `${name} - Graph` },
    impedance !== '' && { src: impedance, title: `${name} - Impedance`, alt: `${name} - Impedance` }
  ].filter(Boolean) as { src: string, title: string, alt: string }[];

  const swiperRef = useRef<SwiperClass | null>(null);
  const [realIndex, setRealIndex] = useState(0);
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={0}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          const indexAttr = swiper.slides[swiper.activeIndex]?.getAttribute('data-swiper-slide-index');
          const real = indexAttr ? parseInt(indexAttr) : 0;
          setRealIndex(real);
        }}
        navigation={true}
        modules={[Navigation, FreeMode]}
        className="mySwiper2 h-full flex items-center"
        style={{
          // @ts-ignore
            "--swiper-navigation-color": "#f2b90f",
            "--swiper-navigation-size": "30px",
            "--swiper-navigation-sides-offset": "0px"
        }}
        data-testid="swiper-carousel-graph-impedance"
      >
        {slides.length > 0 && slides.map((item, index) => (
          <SwiperSlide key={item.alt}>
            <div className="h-full flex justify-center items-center cursor-pointer"
              onClick={() => openLightbox(index)}>
                <Card className="border-none h-full w-full flex items-center justify-center bg-transparent hover:bg-secondary">
                  <CardContent className="p-6 flex items-center justify-center w-full h-full">
                    <div className="relative overflow-hidden flex items-center justify-center h-[200px] w-full">
                      <LazyImageCustom
                        src={item.src.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item.src}` : item.src} 
                        alt={item.title} 
                        width={500}
                        height={500}
                        classname="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="z-10 gap-2 flex justify-center items-center pt-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              realIndex === index ? 'bg-foreground scale-125' : 'bg-slate-300'
            }`}
          ></button>
        ))}
      </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
          plugins={[Zoom, Thumbnails, Captions]}
        />
    </>
  );
}

export default SwiperCarouselGraphImpedance