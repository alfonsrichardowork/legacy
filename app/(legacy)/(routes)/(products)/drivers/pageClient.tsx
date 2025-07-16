"use client"
import { CheckBoxData, Products, SliderData } from "@/app/(legacy)/types";
import AllDriversandFiltersProducts from "./components/all-filters";
import getAllProducts from "@/app/(legacy)/actions/get-all-products";
import { useEffect, useState } from "react";
import { Loader } from "@/app/(legacy)/components/ui/loader";

function createFilterProps(
  key: string,
  name: string,
  unit: string,
  filterKey: string,
) {
  return { key, name, unit, filterKey };
}

function removeDuplicates<RangeSliderFilter>(arr: RangeSliderFilter[]): RangeSliderFilter[] {
  return Array.from(new Set(arr));
}

export default function ProductByCategoryPage() {
  const [allprodserver, setallprodserver] = useState<Products[]>([])
  const [loading, setloading] = useState<boolean>(true)
  const [showserver, setshowserver] = useState<boolean>(true)
  const [sliderRows, setsliderRows] = useState<SliderData[]>([])
  const [checkboxRows, setcheckboxRows] = useState<CheckBoxData[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempData = await getAllProducts();
        
        let sliderRows: SliderData[] = [];
        let checkboxRows: CheckBoxData[] = [];

        let tempSliderLoop = [];
        let tempCheckboxLoop = [];
        let counterShow = 0;
        tempSliderLoop.push(
          createFilterProps('parentSize', 'Diameter Cone', '"', 'size'),
          createFilterProps('allSPL', 'SPL (Sound Pressure Level)', 'dB', 'spl'),
          createFilterProps('allVoiceCoilDiameter', 'Voice Coil Diameter', 'mm', 'voice_coil_diameter'),
        )
        tempSliderLoop.map((value) =>{
          if(value.key==='parentSize'){
            //@ts-ignore
            const allValueWithoutDuplicates: number[] = removeDuplicates(tempData.allsizes);
            const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
            const sortedValues = allValueWithoutDuplicatesAndNone.slice().sort((a, b) => a - b);
            if(sortedValues.length>1){
              counterShow+=1
            }
            sliderRows.push(
              {
                name: value.name, 
                value: sortedValues, 
                unit: value.unit,
                max_index: sortedValues.length - 1,
                min_index: 0,
                minIndex: 0,
                maxIndex: sortedValues.length - 1,
                slug: value.filterKey
              },
            )
          }
          else{
            //@ts-ignore
            const allValueWithoutDuplicates: number[] = removeDuplicates(tempData.allproduct[value.key]);
            const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
            const sortedValues = allValueWithoutDuplicatesAndNone.slice().sort((a, b) => a - b);
            if(sortedValues.length>1){
              counterShow+=1
            }
            sliderRows.push(
              {
                name: value.name, 
                value: sortedValues, 
                unit: value.unit,
                max_index: sortedValues.length - 1,
                min_index: 0,
                minIndex: 0,
                maxIndex: sortedValues.length - 1,
                slug: value.filterKey
              },
            )
          }
        })

        tempCheckboxLoop.push(
          createFilterProps('allSubCategory', 'Series', '', 'series'),
          createFilterProps('allSubSubCategory', 'Type', '', 'sub_sub_category'),
        )
        tempCheckboxLoop.map((value) =>{
          //@ts-ignore
          const allValueWithoutDuplicates: string[] = removeDuplicates(tempData.allproduct[value.key]);
          const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => number != '');
          const sortedValues = allValueWithoutDuplicatesAndNone.sort()
          if(sortedValues.length>1){
            counterShow+=1
          }
          checkboxRows.push(
            {
              name: value.name, 
              value: sortedValues, 
              unit: value.unit,
              slug: value.filterKey,
            },
          )
        })

        if(counterShow===0){
          setshowserver(false)
        }
        
        setsliderRows(sliderRows)
        setcheckboxRows(checkboxRows)
        setallprodserver(tempData.allproduct.allProducts)
        setloading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  

  return(
    loading?
      <div className="flex items-center justify-center w-full h-screen z-50 bg-white">
        <Loader/>
      </div>  
    :
    <>
        <div className="bg-white -z-10">
        <div className="relative w-full py-8 h-fit">
          {showserver?
            <AllDriversandFiltersProducts data={allprodserver} slider={sliderRows} checkbox={checkboxRows} showFilters={showserver} />
          :
            <div className="md:grid md:grid-cols-4">
              <AllDriversandFiltersProducts data={allprodserver} slider={sliderRows} checkbox={checkboxRows} showFilters={showserver} />
            </div>
          }
        </div>
        </div>
    </>
  );
}

