export const dynamic = "force-dynamic";

import { AllFilterProductsOnlyType, CheckBoxData, ChildSpecificationProp, SliderData } from "@/app/(legacy)/types";
import { use } from "react";
import AllDriversandFiltersProducts from "./components/all-filters";
import { removeDuplicates } from "./components/remove-duplicate";

export default function DriversPageWithData({tempDataPromise}: {
  tempDataPromise: Promise<
    [AllFilterProductsOnlyType[], Record<string, ChildSpecificationProp[]>]
  >;
}) {
  const [tempData, allSpecsCombined] = use(tempDataPromise);

  let sliderRows: SliderData[] = [];
  let checkboxRows: CheckBoxData[] = [];
  let showserver: boolean = true;

  let counterShow = 0;
  for (const key in allSpecsCombined) {
    if(allSpecsCombined[key]) {
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

  return (
    showserver?
      <AllDriversandFiltersProducts data={tempData} slider={sliderRows} checkbox={checkboxRows} showFilters={showserver} />
    :
      <div className="md:grid md:grid-cols-4">
        <AllDriversandFiltersProducts data={tempData} slider={sliderRows} checkbox={checkboxRows} showFilters={showserver} />
      </div>
  );
}