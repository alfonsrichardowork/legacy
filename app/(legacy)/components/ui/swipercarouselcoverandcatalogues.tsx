"use client"

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';
import { Card, CardContent } from './card';
import Image from 'next/image';
import { Eye, Loader2 } from 'lucide-react';


import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Captions from "yet-another-react-lightbox/plugins/captions";
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import "yet-another-react-lightbox/plugins/captions.css";
import { LazyImage } from '../lazyImage';
import { LazyImageCustom } from '../lazyImageCustom';


type PropType = {
  cover: string,
  alt: string,
  catalogues: string[],
  catalogues_alt: string[],
}

const SwiperCarouselOneProduct: React.FC<PropType> = (props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { cover, alt, catalogues, catalogues_alt } = props

  return (
    <>
      <Swiper
          style={{
            //@ts-ignore
            "--swiper-navigation-color": "#f2b90f",
            "--swiper-pagination-color": "#f2b90f",
            "--swiper-navigation-size": "30px",
            "--swiper-navigation-sides-offset": "0px"
          }}
          rewind={catalogues && catalogues.length > 6 ? false : true}
          loop={catalogues && catalogues.length > 6 ? true : false}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          centeredSlides={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          navigation={true}
          modules={[FreeMode, Navigation, Thumbs, Pagination]}
          className="mySwiper2 lg:h-80 sm:h-72 h-48 flex items-center"
          thumbs={{ swiper: thumbsSwiper }}
        >
              {catalogues && catalogues.length > 0 && catalogues.map((item, index) => (
                catalogues_alt[index] === 'Top' &&
                  <SwiperSlide key={alt.concat(" - Catalogues - ", index.toString())}>
                    <div className="h-full flex justify-center items-center cursor-pointer"
                    onClick={() => openLightbox(index + 1)}>
                      <Card className="border-none h-full w-full flex items-center justify-center bg-transparent hover:bg-slate-200">
                        <CardContent className="p-6 flex items-center justify-center w-full h-full">
                          <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                            {/* <div className="object-contain max-h-full max-w-full"> */}
                              <LazyImageCustom
                                src={item} 
                                alt={alt} 
                                width={500}
                                height={500}
                                classname='h-full w-fit'
                              />
                            {/* </div> */}
                              {/* <Image 
                                src={item} 
                                alt={alt} 
                                width={1000}
                                height={1000}
                                className="object-contain max-h-full max-w-full"
                                priority
                              /> */}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                  </SwiperSlide>
              ))}
              {cover != '' && 
                  <SwiperSlide key={alt.concat(" - Cover")}>
                    <div className="h-full flex justify-center items-center cursor-pointer"
                    onClick={() => openLightbox(0)}>
                      <Card className="border-none h-full w-full flex items-center justify-center bg-transparent hover:bg-slate-200">
                        <CardContent className="p-6 flex items-center justify-center w-full h-full">
                          <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                              <LazyImageCustom
                                src={cover} 
                                alt={alt} 
                                width={500}
                                height={500}
                                classname='h-full w-fit'
                              />
                              {/* <Image 
                                src={cover} 
                                alt={alt} 
                                width={1000}
                                height={1000}
                                className="object-contain max-h-full max-w-full"
                                priority
                              /> */}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                  </SwiperSlide>
              }
              {catalogues && catalogues.length > 0 && catalogues.map((item, index) => (
                catalogues_alt[index] !== 'Top' &&
                  <SwiperSlide key={alt.concat(" - Catalogues - ", index.toString())}>
                    <div className="h-full flex justify-center items-center cursor-pointer"
                    onClick={() => openLightbox(index + 1)}>
                      <Card className="border-none h-full w-full flex items-center justify-center bg-transparent hover:bg-slate-200">
                        <CardContent className="p-6 flex items-center justify-center w-full h-full">
                          <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                              <LazyImageCustom
                                src={item} 
                                alt={alt} 
                                width={500}
                                height={500}
                                classname='h-full w-fit'
                              />
                              {/* <Image 
                                src={item} 
                                alt={alt} 
                                width={1000}
                                height={1000}
                                className="object-contain max-h-full max-w-full"
                                priority
                              /> */}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                  </SwiperSlide>
              ))}
        </Swiper>



      {/* </div> */}
      {catalogues && catalogues.length > 0 ?
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides=
          {[
            { src: cover, title: alt.concat(" - Cover"), alt },
            ...catalogues.map((item, index) => ({ src: item, title: alt.concat(" - ", catalogues_alt[index] == ''? (index + 1).toString() : catalogues_alt[index]), alt: alt.concat(" - ", catalogues_alt[index] == ''? (index + 1).toString() : catalogues_alt[index])}))
          ]}
          plugins={[Zoom, Thumbnails, Captions]}
        />
        :
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={[{ src: cover, title: alt.concat(" - Cover"), alt }]}
          plugins={[Zoom, Captions]}
        />
      }
    </>
  );
}

export default SwiperCarouselOneProduct
