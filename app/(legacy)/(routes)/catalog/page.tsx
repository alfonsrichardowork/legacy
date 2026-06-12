import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Loader } from "../../components/ui/loader";
import prismadb from "@/lib/prismadb";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { catalogues } from "@prisma/client";

export default async function Catalog() {  
  const catalogData = await prismadb.catalogues.findMany({});
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Catalog | Legacy Speaker",
    "url": `${baseUrl}/catalog`,
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
        <div className='pb-8'>
          <h1 className='text-4xl font-bold text-black pb-4'>
            Catalogue
          </h1>
          <Separator className='bg-foreground w-56 h-2'/>
        </div>
        <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><Loader/></div>}>
          
          {catalogData && catalogData.length > 0 && catalogData.map((val: catalogues, idx) =>
            <div className="py-2" key={idx}>
              <h2 className="text-2xl font-bold text-black pb-1">{val.name}</h2>
                  <h3 className="text-sm font-light text-black pb-4">
                    Tanggal Publikasi: {new Date(val.publicationDate).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
              <Link href={val.pdf.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${val.pdf}` : val.pdf} target="_blank">  
                <div className="w-full bg-blue-500 text-white flex justify-center items-center py-2 rounded-lg hover:bg-foreground transition-all ease-in-out duration-200">
                  <FileDown size={20} />   
                  <h2>Download Catalogues</h2>
                </div>   
              </Link>
              <div className="w-full h-screen pt-8">
                  <iframe
                      src={val.pdf.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${val.pdf}` : val.pdf}
                      style={{ width: '100%', height: '100%' }}
                      frameBorder="0"
                  />
              </div>
              <Separator className='bg-background w-full h-1 mt-8'/>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}