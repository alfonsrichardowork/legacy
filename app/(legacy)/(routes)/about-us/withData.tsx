import { brand } from "@prisma/client";
import { LazyImage } from "../../components/lazyImage";
import DompurifyContent from "../../components/dompurifyText";
import { use } from "react";

export default function AboutUsWithData({aboutUsDataPromise}: {aboutUsDataPromise: Promise<brand>}) {
  const aboutUsData = use(aboutUsDataPromise);
  return (
    <>
      <div className="md:pl-4 md:pb-0 pb-4 flex items-center md:order-2 order-1">
        <LazyImage src={'/images/legacy/SBE_Baru.webp'} alt="Pabrik Sinar Baja Electric" width={1000} height={1000}/>
      </div>

      <div className="pr-4 md:order-1 order-2">
        <h2 className="font-bold text-black pb-8 text-3xl">
            {aboutUsData.title}
        </h2>
        <h3 className="text-black pb-4 text-justify">
            <DompurifyContent text={aboutUsData.desc}/>
        </h3>
      </div>
    </>
  );
}