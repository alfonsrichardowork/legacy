"use client"

import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"

// import required modules
import { FreeMode } from "swiper/modules"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DompurifyContent from "./dompurifyText"

export interface NewsType {
  title: string
  news_img_url: string
  description: string
  slug: string
}

interface SwiperCarouselNewsProps {
  news: NewsType[]
}

export default function SwiperCarouselNews({ news }: SwiperCarouselNewsProps) {
  return (
    <Swiper
      slidesPerView={1.25}
      spaceBetween={10}
      freeMode={true}
      modules={[FreeMode]}
      className="mySwiper w-full h-full"
      data-testid="swiper-carousel-news"
      autoHeight={true}
    >
      {news.map((value, index) => (
        <SwiperSlide key={index} data-testid={`swiper-slide-news-${index}`} className="h-full flex">
          <div
            className={`${index === 0 ? "pr-4" : index === news.length - 1 ? "pl-4" : "px-2"} flex flex-col h-full w-full`}
            key={index}
          >
            <Image
              src={
                value.news_img_url.startsWith("/uploads/")
                  ? `${process.env.NEXT_PUBLIC_ROOT_URL}${value.news_img_url}`
                  : value.news_img_url
              }
              alt={value.title}
              width={500}
              height={500}
              className="w-fit h-[300px] mx-auto rounded-xl"
              data-testid={`news-image-${index}`} 
            />
            <h3 className="text-2xl font-bold text-black w-full line-clamp-2 my-4">
              {value.title}
            </h3>

            <h4 className="text-black w-full line-clamp-3 my-4" data-testid={`news-description-${index}`}>
              <DompurifyContent text={value.description} />
            </h4>
            <div className="items-start pb-4 pt-2 w-full mt-auto">
              <Button asChild size={"lg"} variant={"secondary"} className="w-full">
                <Link
                  href={`/news/${value.slug}`}
                  className="text-white font-bold"
                  data-testid={`read-more-${value.slug}`}
                >
                  READ MORE
                </Link>
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
