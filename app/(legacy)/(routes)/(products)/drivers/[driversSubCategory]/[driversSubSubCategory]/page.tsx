"use client"
import { Products, SliderData } from '@/app/(legacy)/types';
import AllDriversandFiltersProducts from '../../components/all-filters';
import getAllProductsBySubSubCategory from '@/app/(legacy)/actions/get-all-products-by-sub-sub-category';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Loader } from '@/app/(legacy)/components/ui/loader';

type Props = {
  params: Promise<{ driversSubCategory: string, driversSubSubCategory: string }>
}

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

export default function ProductBySubSubCategoryPage(props: Props) {
  // const [allproduct, setAllProducts] = useState<Products[]>([])
  // const [slider, setSlider] = useState<SliderData[]>([])
  // const [loading, setLoading] = useState<boolean>(true)
  // const [show, setShow] = useState<boolean>(true)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

const [allprodserver, setallprodserver] = useState<Products[]>([])
  const [loading, setloading] = useState<boolean>(true)
  const [showserver, setshowserver] = useState<boolean>(true)
  const [sliderRows, setsliderRows] = useState<SliderData[]>([])
  const [driversubcat, setdriversubcat] = useState<string>("")
  const [driversubsubcat, setdriversubsubcat] = useState<string>("")
  
  useEffect(() => {
    const fetchData = async () => {
      try {

        let driversubcat = (await props.params).driversSubCategory
        let driversubsubcat = (await props.params).driversSubSubCategory
        let tempData = await getAllProductsBySubSubCategory(driversubcat, driversubsubcat) ;
        let sliderRows: SliderData[] = [];
        setdriversubcat(driversubcat)
        setdriversubsubcat(driversubsubcat)
        let tempSliderLoop = [];
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
              sliderRows.push(
                {
                  name: value.name, 
                  value: sortedValues, 
                  unit: value.unit,
                  max_index: sortedValues.length - 1,
                  min_index: 0,
                  slug: value.filterKey
                },
              )
            }
          }
        })
        if(counterShow===0){
          setshowserver(false)
        }
        
        setsliderRows(sliderRows)
        setallprodserver(tempData.allproduct.allProducts)
        setloading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",    
    "url": driversubcat && driversubsubcat && driversubcat!= "" && driversubsubcat != "" ? "https://legacy.us.com/drivers/".concat(driversubcat, "/", driversubsubcat) : '', 
    "name": "Legacy Speaker",
    "description":  driversubcat && driversubsubcat && driversubcat!= "" && driversubsubcat != "" ? "The best ".concat(driversubcat, " ", driversubsubcat, " series from Legacy Speaker."): '',
    // "logo": "https://legacy.us.com/images/legacy/logo_legacy.webp",
    "itemListElement": allprodserver.map((driver, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://legacy.us.com/products/${driver.slug}`, // Use the correct URL structure
      "item": {
        "@type": "AudioObject",
        "name": driver.name,
        "description": driver.name,
        "identifier": driver.slug || driver.id,
        "contentUrl": driver.coverUrl,
       "keywords": `Legacy Speaker, Legacy Drivers, Drivers Legacy, ${driver.name}, ${driver.size.value} inch drivers, ${driver.size.value}" drivers, ${driver.sub_categories[0].name} series, ${driver.sub_categories[0].name} ${driver.sub_sub_categories[0].name}, Sinar Baja Electric, Sinar Baja Electric Indonesia`,
        "isPartOf": "Legacy Speaker",
        "provider": {
          "@type": "Organization",
          "name": "Legacy Speaker"
        }
      }
    }))
  };

  return(
    loading?
      <div className="flex items-center justify-center w-full h-screen z-50 bg-white">
        <Loader/>
      </div>  
    :
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        /> 
      </Head>
      {/* {loading?
        <FullScreenLoader isVisible={loading} />
        :
        // <div className="xl:px-60 xl:py-8 lg:px-48 lg:py-6 md:px-40 sm:px-32 px-8 py-4"> */}
    <div className="w-full bg-white py-8 h-fit">
          {/* <div className="md:grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4"> */}
            <AllDriversandFiltersProducts data={allprodserver} slider={sliderRows} checkbox={[]} showFilters={showserver}/>
          {/* </div> */}
        </div>
      {/* } */}
    </>
  );
}

