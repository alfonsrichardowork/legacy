export const dynamic = "force-dynamic";

import getAllCatalogues from "../../actions/get-all-catalogues";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Loader } from "../../components/ui/loader";
import CatalogWithData from "./withData";

export default function Catalog() {
  const catalogDataPromise = getAllCatalogues();
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
          <CatalogWithData catalogDataPromise={catalogDataPromise} />
        </Suspense>
      </div>
    </div>
  );
}