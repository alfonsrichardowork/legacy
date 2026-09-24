
import { agen } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Loader } from "../../components/ui/loader";
import prismadb from "@/lib/prismadb";
import { Phone } from "lucide-react";
import { cacheLife } from "next/cache";

async function getData() {
  'use cache'
  cacheLife('minutes')
  const agen = await prismadb.agen.findMany({});
  return agen
}

export default async function Agen() {
  const agen = await getData()
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const subOrganizations = agen.map((val: agen) => ({
    "@type": "LocalBusiness",
    "name": val.name ?? "",
    "telephone": val.phoneNumber ?? "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": JSON.parse(val.city).name ?? "",
      "addressRegion": JSON.parse(val.state).name ?? "",
      "addressCountry": JSON.parse(val.country).iso2 ?? "",
    }
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Legacy Speaker",
    "url": `${baseUrl}/agen`,
    "logo": `${baseUrl}/images/legacy/logo_legacy.webp`,
    "description": "Find our agents around the world.",
    "subOrganization": [
      ...subOrganizations,
    ]
  }

  
  const segmentedagen = agen.reduce((acc, dist) => {
    const key = `${JSON.parse(dist.city).name} - ${JSON.parse(dist.state).name}`;
    if (!acc[key]) {
        acc[key] = [];
    }
    acc[key].push(dist);
    return acc;
    }, {} as Record<string, agen[]>);

  return (
    <div className="bg-white -z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className='sr-only'>Agen | Legacy Speaker</h1>
      <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit">
        <div className="pb-4">
          <div className='text-4xl font-bold text-black pb-4'>
            List Agen
          </div>
          <Separator className='bg-foreground w-56 h-2'/>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 container mx-auto xl:px-36 lg:px-20 px-10 pb-8">
        <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><Loader/></div>}>
        
          {Object.entries(segmentedagen).map(([location, group]) => (
            <div key={location} className="w-full lg:w-[49%]">
              <div className="border-2 rounded-lg p-4 shadow-lg border-secondary bg-white h-full">
                <h2 className="text-3xl font-bold text-black mb-6">{location}</h2>
                {group.map((d) => (
                  <div key={d.id} className="mb-2">
                    <h3 className="font-bold text-xl text-background">{d.name}</h3>
                    <div className="flex items-center gap-1 text-black">
                      <Phone size={18} />
                      <a
                        href={`tel:${d.phoneNumber}`}
                        className="text-blue-600 hover:underline"
                      >
                        {d.phoneNumber}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div> 
          ))}
        </Suspense>
      </div>
    </div>
  );
}