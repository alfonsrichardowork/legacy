export const dynamic = "force-dynamic";

import getSubCatNameBySlug from "@/app/(legacy)/actions/get-SubCat_Name";
import getSubSubCatNameBySlug from "@/app/(legacy)/actions/get-SubSubCat_Name";
import { AllFilterProductsOnlyType, CheckBoxData, ChildSpecificationProp, SliderData } from "@/app/(legacy)/types";
import getAllProductsForFilterPage from "@/app/(legacy)/actions/get-all-products-for-filter-page";
import { removeDuplicates } from "../../components/remove-duplicate";
import AllDriversandFiltersProducts from "../../components/all-filters";
import { Suspense } from "react";
import FullScreenLoader from "@/app/(legacy)/components/loadingNoScroll";

type Props = {
  params: Promise<{ driversSubCategory: string, driversSubSubCategory: string }>
}

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_PRODUCTS_BY_SUB_SUB_CATEGORY}`;

export default async function SubSubDriversPage(props: Props) {
  let driversubcat = (await props.params).driversSubCategory
  let driversubsubcat = (await props.params).driversSubSubCategory
  const API_EDITED_FIRST = API.replace('{productSubCategory}', driversubcat)
  const API_EDITED = API_EDITED_FIRST.replace('{productSubSubCategory}', driversubsubcat)
  let [tempData, allSpecsCombined]: [AllFilterProductsOnlyType[], Record<string, ChildSpecificationProp[]>] = await getAllProductsForFilterPage(API_EDITED);
  let sliderRows: SliderData[] = [];
  let checkboxRows: CheckBoxData[] = [];
  let showserver: boolean = true;

  let counterShow = 0;
  for (const key in allSpecsCombined) {
    if(allSpecsCombined[key]){
      if(key !== 'series' && key != "type") {
        const allValueWithoutDuplicates: number[] = removeDuplicates(allSpecsCombined[key].map((val) => Number(val.value)));
        const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
        const sortedValues = allValueWithoutDuplicatesAndNone.slice().sort((a, b) => a - b);
        if(sortedValues.length>1){
          counterShow+=1
        }
        sliderRows.push(
          {
            name: allSpecsCombined[key][0]?.childname ?? '', 
            value: sortedValues, 
            unit: allSpecsCombined[key][0]?.unit ?? '',
            max_index: sortedValues.length - 1,
            min_index: 0,
            minIndex: 0,
            maxIndex: sortedValues.length - 1,
            slug: key
          },
        )
      }
      else{
        const allValueWithoutDuplicates: string[] = removeDuplicates(allSpecsCombined[key].map((val) => val.value));
        const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => number != '');
        const sortedValues = allValueWithoutDuplicatesAndNone.sort()
        if(sortedValues.length>1){
          counterShow+=1
        }
        checkboxRows.push(
          {
            name: allSpecsCombined[key][0]?.childname ?? '', 
            value: sortedValues, 
            unit: allSpecsCombined[key][0]?.unit ?? '',
            slug: key,
          },
        )
      }
    }
  }

  if(counterShow===0){
    showserver = false
  }
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const [subCatNameResult, subSubCatNameResult] = await Promise.allSettled([
    getSubCatNameBySlug(driversubcat),
    getSubSubCatNameBySlug(driversubsubcat),
  ]);

  const subCatName = subCatNameResult.status === 'fulfilled' ? subCatNameResult.value : { name: '' };
  const subSubCatName = subSubCatNameResult.status === 'fulfilled' ? subSubCatNameResult.value : { name: '' };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Speaker Drivers",
    "description":  driversubcat && driversubsubcat && driversubcat!= "" && driversubsubcat != "" ? "The best ".concat(driversubcat, " ", driversubsubcat, " series from Legacy Speaker."): 'All drivers from Legacy Speaker.',
    "url": driversubcat && driversubsubcat && driversubcat!= "" && driversubsubcat != "" ? `${baseUrl}/drivers/${driversubcat}/${driversubsubcat}` : `${baseUrl}/drivers/`,
    "itemListElement": tempData.map((driver, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/products/${driver.products.slug}`,
        "name": driver.products.name,
        "description": driver.products.name,
        "image": `${baseUrl}${driver.products.cover_img?.url}`,
        "sku": driver.products.slug || driver.products.id,
        "brand": {
          "@type": "Brand",
          "name": "Legacy Speaker"
        }
      }
    }))
  }  

  return (
    <div className="w-full bg-white py-8 h-fit">
      <Suspense fallback={<FullScreenLoader isVisible/>}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1 className="sr-only">{subCatName.name} {subSubCatName.name} Series | Legacy Speaker</h1>
        <AllDriversandFiltersProducts data={tempData} slider={sliderRows} checkbox={[]} showFilters={showserver}/>
      </Suspense>
    </div>
  );
}