export const dynamic = "force-dynamic";

import { Suspense } from "react";
import getAllNews from "../../actions/get-all-news";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import { SliderDataNews } from "../../types";
import AllNewsandFilters from "./components/all-filters";
import FullScreenLoader from "../../components/loadingNoScroll";
import { removeDuplicates } from "../(products)/drivers/components/remove-duplicate";

function createFilterProps(
  key: string,
  name: string,
  unit: string,
  filterKey: string,
) {
  return { key, name, unit, filterKey };
}

const monthMap: Record<string, string> = {
  'Januari': 'January',
  'Februari': 'February',
  'Maret': 'March',
  'April': 'April',
  'Mei': 'May',
  'Juni': 'June',
  'Juli': 'July',
  'Agustus': 'August',
  'September': 'September',
  'Oktober': 'October',
  'November': 'November',
  'Desember': 'December',
};

export default async function News() { 
  let tempData = await getAllNews('all');
  const all_Date = tempData.map(news => news.event_date);
  let sliderRows: SliderDataNews[] = [];
  let showserver: boolean = true;
  let tempSliderLoop = [];
  let counterShow = 0;
  tempSliderLoop.push(
    createFilterProps('event_date', 'Tempo Waktu', '', 'eventDate'),
  )
  tempSliderLoop.map((value) =>{
    //@ts-ignore
    const allValueWithoutDuplicates: number[] = removeDuplicates(all_Date);
    const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
    const sortedValues2 = allValueWithoutDuplicatesAndNone.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const sortedValues = sortedValues2.map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    });
    const timestampsArray: number[] = sortedValues
      .map(dateStr => {
        // Replace Indonesian month with English equivalent
        const parts = dateStr.split(' ');
        const [day, month, year] = parts;
        const englishMonth = monthMap[month];
        if (!englishMonth) return NaN;
        return new Date(`${day} ${englishMonth} ${year}`).getTime();
      })
      .sort((a, b) => a - b);
    if(sortedValues.length>1){
      counterShow+=1
    }
    let newSortedValues : number[] = []
    sortedValues.map((val) =>{
      newSortedValues.push(Number(val))
    })
    sliderRows.push(
      {
        name: value.name, 
        value: timestampsArray,
        realDate: sortedValues,
        unit: value.unit,
        max_index: sortedValues.length - 1,
        min_index: 0,
        minIndex: 0,
        maxIndex: sortedValues.length - 1,
        slug: value.filterKey
      },
    )
  })
  if(counterShow===0){
    showserver = false
  }

  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",      
    "url": `${baseUrl}/news`, 
    "name": "Legacy Speaker",
    "description": "All news from Legacy Speaker.",
    "itemListElement": tempData?.map((news, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": news.title,
        "image": `${baseUrl}${news.news_img_url}`,
        "url": `${baseUrl}/news/${news.slug}`,
        "description": news.description,
        "datePublished": news.event_date,
        "dateModified": news.updatedAt,  
        "author": {
          "@type": "Organization",
          "name": "Legacy Speaker"
        },
      }
    }))
  };

  return (
    <div className="bg-white -z-10">
      <Suspense fallback={<FullScreenLoader isVisible/>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
        <div className="relative w-full bg-white p-8 h-fit container mx-auto xl:px-36 lg:px-20 px-10 ">
        <div className="pb-6">
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbPage><h1>All News</h1></BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
          {showserver?
              <AllNewsandFilters data={tempData} slider={sliderRows} showFilters={showserver} />
            :
            <div className="md:grid md:grid-cols-4">
              <AllNewsandFilters data={tempData} slider={sliderRows} showFilters={showserver} />
            </div>
            }
        </div>
      </Suspense>
    </div>
  );
}