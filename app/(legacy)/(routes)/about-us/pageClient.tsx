import { Brand } from "@prisma/client";
import { Separator } from "../../../../components/ui/separator";
import { LazyImage } from "../../components/lazyImage";
import DompurifyContent from "../../components/dompurifyText";

type Props = {
  about: Brand
};

export default function AboutUsClient({ about }: Props) {
  return (
    <div className="bg-white -z-10">
      <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit">
        <div className='pb-4'>
          <h1 className='text-4xl font-bold text-black pb-4'>
            About Us
          </h1>
          <Separator className='bg-foreground w-56 h-2'/>
        </div>
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
      </div>
    </div>
  );
}