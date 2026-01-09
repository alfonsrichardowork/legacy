"use client"

import { Loader, MapPin, Phone } from "lucide-react";
import { Separator } from "../../../../components/ui/separator";
import { use, useEffect, useState } from "react";
import { LazyImageContact } from "../../components/lazyImageContact";
import { contacts } from "@prisma/client";
import '@/app/css/styles.scss';

export function extractIframeSrc(html: string): string | undefined {
  if (typeof window === "undefined") return undefined; // ✅ Prevent server crash

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const iframe = doc.querySelector("iframe");
  return iframe?.getAttribute("src") || undefined;
}

export default function ContactUsClient({contactDataPromise}: {contactDataPromise: Promise<contacts[]>}) {
    const contacts = use(contactDataPromise);
    const [activeMapIndex, setActiveMapIndex] = useState<number>(0)
    const [allPhone, setAllPhone] = useState<string[][]>([])
    const [_, setIsScrolling] = useState(false);
    const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!contacts?.length) return;
        const src = extractIframeSrc(contacts[activeMapIndex]?.locationUrl || "");
        setIframeSrc(src);
    }, [activeMapIndex, contacts]);

  const handleScrollToTop = () => {
    setIsScrolling(true);

    document.body.classList.add("disable-pointer");

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const scrollCheck = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollCheck);
        setIsScrolling(false);
        document.body.classList.remove("disable-pointer");
      }
    }, 100);
    
    setTimeout(() => {
        document.body.classList.remove("disable-pointer");
        setIsScrolling(false);
  }, 1500);
  };

  useEffect( () => {
    async function fetchData(){
      let alltemp: string[][] = []
      contacts.map((val) => {
        let temp: string[] = val.phone.split('||')
        alltemp.push(temp)
      })
      setAllPhone(alltemp)
    }
    fetchData()
  }, [contacts]);

  return (
    <>
      <div className="map-container">
        {iframeSrc ?
          <iframe src={iframeSrc} width="100%" height="500" loading="lazy"></iframe>
          :
          <div className="h-[500px] w-screen flex items-center justify-center bg-zinc-100">
            <Loader className="animate-spin text-gray-500" size={20} />
          </div>
        }
      </div>
      <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit flex justify-left">
        <div className='pb-4'>
          <div className='text-4xl font-bold text-black pb-4'>
            Contact Us
          </div>
          <div className="flex justify-left">
            <Separator className='bg-foreground w-56 h-2'/>
          </div>
        </div>
      </div>
      <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-8 h-fit">
        {contacts && contacts.length > 0 && contacts.map((val: contacts, idx: number) => 
          <div key={idx} className={`${idx !== contacts.length - 1 && 'pb-4'}`}>
            <div className={`md:grid md:grid-cols-2 block border-2 rounded-lg shadow-lg overflow-hidden hover:border-secondary ${activeMapIndex === idx && 'border-secondary'}`} onMouseEnter={() => setActiveMapIndex(idx)} onClick={handleScrollToTop}>
              <div className="p-4">
                <div className="pb-4">
                  <h2 className="md:text-4xl text-3xl font-bold text-black pb-2">{val.type}</h2>
                  <Separator className="bg-secondary w-56 h-2" />
                </div>

                <h3 className="text-black font-bold text-2xl pb-2">{JSON.parse(val.city).name}</h3>
                <div className="flex text-black pb-4">
                  <div className="pr-2">
                    <MapPin size={20} />
                  </div>
                  <h3>: {val.address}</h3>
                </div>

                <div className="text-black font-bold text-xl pb-2">
                    Kontak
                </div>
                {allPhone[idx] && allPhone[idx].length > 0 && allPhone[idx].map((valPhone, idxPhone) => 
                  <div className="flex text-black" key={idxPhone}>
                    <div className="pr-2">
                      <Phone size={20} />
                    </div>
                    <h3>: {valPhone}</h3>
                  </div>
                )}
              </div>

              <div className="relative md:block hidden">
                <LazyImageContact src={val.img.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${val.img}` : val.img} alt={`Contact Us ${idx}`}/>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}