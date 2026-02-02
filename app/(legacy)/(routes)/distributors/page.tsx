export const dynamic = "force-dynamic";

import { distributors } from "@prisma/client";
import getAllDistributor from "../../actions/get-all-distributor";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Loader } from "../../components/ui/loader";
import DistributorsWithData from "./withData";

async function DistributorJsonLd() {
  const distributorData: distributors[] = await getAllDistributor()
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const subOrganizations = distributorData.map((val: distributors) => ({
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
    "url": `${baseUrl}/distributors`,
    "logo": `${baseUrl}/images/legacy/logo_legacy.webp`,
    "description": "Find our distributors around the world.",
    "subOrganization": [
      ...subOrganizations,
    ]
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

export default function Distributors() {
  const distributorsDataPromise = getAllDistributor();

  return (
    <div className="bg-white -z-10">
      <h1 className='sr-only'>Distributors | Legacy Speaker</h1>
      <DistributorJsonLd />
      <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit">
        <div className="pb-4">
          <div className='text-4xl font-bold text-black pb-4'>
            List Distributors
          </div>
          <Separator className='bg-foreground w-56 h-2'/>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 container mx-auto xl:px-36 lg:px-20 px-10 pb-8">
        <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><Loader/></div>}>
          <DistributorsWithData distributorsDataPromise={distributorsDataPromise} />
        </Suspense>
      </div>
    </div>
  );
}