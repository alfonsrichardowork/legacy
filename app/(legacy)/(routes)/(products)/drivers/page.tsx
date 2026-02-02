export const dynamic = "force-dynamic";

import { AllFilterProductsOnlyType, ChildSpecificationProp } from "@/app/(legacy)/types";
import getAllProductsForFilterPage from "@/app/(legacy)/actions/get-all-products-for-filter-page";
import { Suspense } from "react";
import { Loader } from "@/app/(legacy)/components/ui/loader";
import DriversPageWithData from "./withData";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_PRODUCTS}`;

async function AllDriversJsonLd() {
  let [tempData, _]: [AllFilterProductsOnlyType[], Record<string, ChildSpecificationProp[]>] = await getAllProductsForFilterPage(API);
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Speaker Drivers",
    "description": "All drivers from Legacy Speaker.",
    "url": `${baseUrl}/drivers`,
    "itemListElement": tempData.map((driver, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/products/${driver.products.slug}`,
        "name": driver.products.name,
        "description": driver.products.name,
        "image": `${baseUrl}${driver.products.cover_img.url}`,
        "sku": driver.products.slug || driver.products.id,
        "brand": {
          "@type": "Brand",
          "name": "Legacy Speaker"
        }
      }
    }))
  }  

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}


export default function DriversPage() {
  const tempDataPromise = getAllProductsForFilterPage(API)
  return (
    <div className="bg-white -z-10">
      <AllDriversJsonLd />
      <h1 className="sr-only">All Drivers | Legacy Speaker</h1>
      <div className="relative w-full py-8 h-fit">
        <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><Loader/></div>}>
          <DriversPageWithData tempDataPromise={tempDataPromise} />
        </Suspense>
      </div>
    </div>
  );
}