"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SwiperCarouselFeaturedSeries from "../../components/ui/swipercarouselfeaturedseries";
import { featuredseries } from "@prisma/client";

type PropType = {
  seri: featuredseries[];
};

export const FeaturedSeriesClient: React.FC<PropType> = ({ seri }) => {
  const [mounted, setMounted] = useState(false);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    setMounted(true);

    const check = () => setIsLg(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  // ✅ Prevent hydration mismatch
  if (!mounted) return null;

  // Desktop
  if (isLg) {
    return <SwiperCarouselFeaturedSeries seri={seri} />;
  }

  // Mobile
  return (
    <div>
      {seri.map((series, index) => (
        <Link key={index} href={series.href} className="group cursor-pointer relative">
          <div className="rounded-lg border shadow-lg overflow-hidden flex flex-row h-full my-3">
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
  );
};
