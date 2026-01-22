import { use } from "react";
import { NewsType, SliderDataNews } from "../../types";
import AllNewsandFilters from "./components/all-filters";
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

export default function NewsWithData({newsDataPromise}: {newsDataPromise: Promise<NewsType[]>}  ) { 
  const tempData = use(newsDataPromise)
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
        const englishMonth = monthMap[month ?? 'Januari'];
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

  return (
    showserver?
      <AllNewsandFilters data={tempData} slider={sliderRows} showFilters={showserver} />
    :
      <div className="md:grid md:grid-cols-4">
        <AllNewsandFilters data={tempData} slider={sliderRows} showFilters={showserver} />
      </div>
  );
}