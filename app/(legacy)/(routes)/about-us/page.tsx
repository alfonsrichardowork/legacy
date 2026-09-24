import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Loader } from "../../components/ui/loader";
import prismadb from "@/lib/prismadb";
import { LazyImage } from "../../components/lazyImage";
import DompurifyContent from "../../components/dompurifyText";
import { cacheLife } from "next/cache";

async function getData() {
  'use cache'
  cacheLife('minutes')
  const about = await prismadb.brand.findFirst({
    select: {
      title: true,
      desc: true
    }
  });
  return about
}


export default async function AboutUs() {
  const about = await getData();
  if (!about) {
    return null
  }
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "About Us | Legacy Speaker",
    "url": `${baseUrl}/about-us`,
    "logo": `${baseUrl}/images/legacy/logo_legacy.webp`,
    "description": "Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!",
  };

  return (
    <div className="bg-white -z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit">
        <div className='pb-4'>
          <h1 className='text-4xl font-bold text-black pb-4'>
            About Us
          </h1>
          <Separator className='bg-foreground w-56 h-2'/>
        </div>
        <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><Loader/></div>}>
          <div className="pb-4 md:grid md:grid-cols-2">
            <div className="md:pl-4 md:pb-0 pb-4 flex items-center md:order-2 order-1">
              <LazyImage src={'/images/legacy/SBE_Baru.webp'} alt="Pabrik Sinar Baja Electric" width={1000} height={1000}/>
            </div>

            <div className="pr-4 md:order-1 order-2">
              <h2 className="font-bold text-black pb-8 text-3xl">
                  {about.title}
              </h2>
              <h3 className="text-black pb-4 text-justify">
                  <DompurifyContent text={about.desc}/>
              </h3>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}