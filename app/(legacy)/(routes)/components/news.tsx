import Image from "next/image";
import Link from "next/link";
import { Separator } from "../../../../components/ui/separator";
import { Button } from "@/components/ui/button";
import SwiperCarouselNews from "../../components/ui/swipercarouselnews";
import getAllNews from "../../actions/get-all-news";
import { Suspense } from "react";
import DompurifyContent from "../../components/dompurifyText";
import FullScreenLoader from "../../components/loadingNoScroll";

export async function News() {
    const allNews = await getAllNews("3");

  return (
    <div className="relative w-full h-fit bg-slate-100">
      <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:pt-8 lg:pt-6 pt-4 h-fit items-start block text-start">
        <h2 className="text-3xl font-bold text-black pb-4 w-full flex justify-center">BERITA TERBARU</h2>
        <Separator className="bg-foreground w-56 h-2 mx-auto" />
    
        {/* <Suspense fallback={<FullScreenLoader isVisible/>}> */}
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
                  <Image
                    src={value.news_img_url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${value.news_img_url}` : value.news_img_url}
                    alt={value.title}
                    width={500}
                    height={500}
                    className="w-fit lg:h-[300px] h-[200px] mx-auto rounded-xl"
                    loading="lazy"
                  />
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
        {/* </Suspense> */}
      </div>
    </div>
  );
};