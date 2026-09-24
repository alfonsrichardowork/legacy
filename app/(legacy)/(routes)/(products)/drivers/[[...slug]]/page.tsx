import { allproducts, allproductsSubCat } from '@/app/(legacy)/utils/filterPageProps';
import { Suspense } from 'react';
import { Loader } from '@/app/(legacy)/components/ui/loader';
import prismadb from '@/lib/prismadb';
import { AllFilterProductsOnlyType, CheckBoxData, ChildSpecificationProp, SliderData } from '@/app/(legacy)/types';
import DriversPageWithData from '../../components/withData';
import FullScreenLoader from '@/app/(legacy)/components/loadingNoScroll';
import AllDriversandFiltersProducts from '../../components/all-filters';
import { cacheLife } from 'next/cache';

async function getAllDriversData(neededSpec: string[]) {
  'use cache'
  cacheLife('minutes')
  const allTypes = await prismadb.allcategory.findMany({
    where: {
      type: 'Sub Sub Category'
    },
    select:{
      slug: true
    }
  })
  
  const allBrand = await prismadb.allcategory.findMany({
    where: {
      type: 'Sub Category'
    }
  })

  const allSpecsNeeded = await prismadb.dynamicspecification.findMany({
    where: {
      slug: {
        in : neededSpec.map((val) => val)
      }
    },
    select: {
      id: true
    }
  })

  const products = await prismadb.product.findMany({
    where: {
      isArchived: false
    },
    include: {
      allCat: {
        where: {
          category: {
            type: {
              in: ['Sub Category', 'Sub Sub Category']
            }
          }
        },
        include:{
          category: true
        }
      },
      size: {
        select: {
          name: true,
          value: true
        }
      },
      connectorSpecifications: {
        where: {
          dynamicspecificationId: {
            in: allSpecsNeeded.map((val) => val.id)
          }
        },
        include: {
          dynamicspecification: {
            select: {
              name: true,
              unit: true,
              slug: true
            }
          }
        }
      }
    }
  });
  return [allTypes, allBrand, products] as const;
}

async function getDriverData(subslug: string) {
  'use cache'
  cacheLife('minutes')
  const productIdbyCat =  await prismadb.allproductcategory.findMany({
    where:{
      category: {
        slug: subslug,
        type: 'Sub Category'
      }
    },
    select:{
        productId: true
    }
  })
  const productIds = productIdbyCat.map((value) => value.productId)

  let neededSpec = allproductsSubCat
    const allTypes = await prismadb.allcategory.findMany({
      where: {
        type: 'Sub Sub Category'
      },
      select:{
        slug: true
      }
    })
    
    const allBrand = await prismadb.allcategory.findMany({
      where: {
        type: 'Sub Category'
      }
    })

  const allSpecsNeeded = await prismadb.dynamicspecification.findMany({
    where: {
      slug: {
        in : neededSpec.map((val) => val)
      }
    },
    select: {
      id: true
    }
  })

  // if(params.brandId === process.env.NEXT_PUBLIC_SB_AUDIENCE_ID) {     
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      },
      isArchived: false
    },
    include: {
      allCat: {
        where: {
          category: {
            type: {
              in: ['Sub Category', 'Sub Sub Category']
            }
          }
        },
        include: {
          category: true
        }
      },
      size: {
        select: {
          name: true,
          value: true
        }
      },
      connectorSpecifications: {
        where: {
          dynamicspecificationId: {
            in: allSpecsNeeded.map((val) => val.id)
          }
        },
        include: {
          dynamicspecification: {
            select: {
              name: true,
              unit: true,
              slug: true
            }
          }
        }
      }
    }
  });

  return [allTypes, allBrand, products, neededSpec] as const;
}


async function getOneDriverData(subslug: string) {
  'use cache'
  cacheLife('minutes')
  const [subCatNameResult] = await Promise.allSettled([
    await prismadb.allcategory.findFirst({
      where: {
        slug: subslug,
        type: "Sub Category"
      },
      select:{
        name: true,
        description: true
      }
    })
  ]);
  return subCatNameResult
}


async function getData(subslug: string) {
  'use cache'
  cacheLife('minutes')
  const productIdbyCat =  await prismadb.allproductcategory.findMany({
    where:{
      category: {
        slug: subslug,
        type: 'Sub Category'
      }
    },
    select:{
        productId: true
    }
  })

  const productIds = productIdbyCat.map((value) => value.productId)

  let neededSpec = allproductsSubCat
    const allTypes = await prismadb.allcategory.findMany({
      where: {
        type: 'Sub Sub Category'
      },
      select:{
        slug: true
      }
    })
    
    const allBrand = await prismadb.allcategory.findMany({
      where: {
        type: 'Sub Category'
      }
    })

  const allSpecsNeeded = await prismadb.dynamicspecification.findMany({
    where: {
      slug: {
        in : neededSpec.map((val) => val)
      }
    },
    select: {
      id: true
    }
  })

  // if(params.brandId === process.env.NEXT_PUBLIC_SB_AUDIENCE_ID) {     
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      },
      isArchived: false
    },
    include: {
      allCat: {
        where: {
          category: {
            type: {
              in: ['Sub Category', 'Sub Sub Category']
            }
          }
        },
        include: {
          category: true
        }
      },
      size: {
        select: {
          name: true,
          value: true
        }
      },
      connectorSpecifications: {
        where: {
          dynamicspecificationId: {
            in: allSpecsNeeded.map((val) => val.id)
          }
        },
        include: {
          dynamicspecification: {
            select: {
              name: true,
              unit: true,
              slug: true
            }
          }
        }
      }
    }
  });
  return [allTypes, allBrand, products, neededSpec] as const;
}

async function getFinalData(subslug: string, subsubslug: string) {
  'use cache'
  cacheLife('minutes')
  const [subCatNameResult, subSubCatNameResult] = await Promise.allSettled([
    await prismadb.allcategory.findFirst({
      where: {
        slug: subslug,
        type: "Sub Category"
      },
      select:{
        name: true,
        description: true
      }
    }),
    await prismadb.allcategory.findFirst({
      where: {
        slug: subsubslug ?? '',
        type: "Sub Sub Category"
      },
      select:{
        name: true,
        description: true
      }
    })
  ]);
  return [subCatNameResult, subSubCatNameResult] as const;
}


export async function generateStaticParams() {
    const connectors = await prismadb.allproductcategory.findMany({
        select: {
            productId: true,
            category: {
                select: {
                    slug: true,
                    type: true,
                },
            },
        },
    });

    const paths = Array.from(
    connectors.reduce((map, row) => {
        const existing = map.get(row.productId) ?? [];

        existing.push({
        slug: row.category.slug,
        type: row.category.type,
        });

        map.set(row.productId, existing);

        return map;
    }, new Map<string, { slug: string; type: string }[]>()).values()
    ).flatMap(categories => {
    const category = categories
        .filter(c => c.type === 'Category')
        .map(c => c.slug);

    const subCategory = categories
        .filter(c => c.type === 'Sub Category')
        .map(c => c.slug);

    const subSubCategory = categories
        .filter(c => c.type === 'Sub Sub Category')
        .map(c => c.slug);

    const result: string[] = [];

    // Category only
    if (!subCategory.length) {
        return category;
    }

    // Category + Sub Category
    for (const cat of category) {
        for (const sub of subCategory) {
        if (!subSubCategory.length) {
            result.push(`${cat}/${sub}`);
        } else {
            // Category + Sub Category + Sub Sub Category
            for (const subSub of subSubCategory) {
            result.push(`${cat}/${sub}/${subSub}`);
            }
        }
        }
    }

    return result;
    });

    const allPaths = new Set<string>();

    for (const path of paths) {
        const parts = path.split('/');

        // Original path
        allPaths.add(path);

        // Level 1 (/drivers)
        if (parts.length >= 1) {
            allPaths.add(parts[0] ?? '');
        }

        // Level 2 (/drivers/midranges)
        if (parts.length >= 2) {
            allPaths.add(parts.slice(0, 2).join('/'));
        }
    }

    const uniqueSortedPaths = [...allPaths].sort((a, b) => {
        const depthA = a.split('/').length;
        const depthB = b.split('/').length;

        if (depthA !== depthB) {
            return depthA - depthB;
        }

        return a.localeCompare(b);
    });
    
    return uniqueSortedPaths.map(path => ({
        slug: path.split('/').slice(1),
    }));
}


function removeDuplicates<RangeSliderFilter>(arr: RangeSliderFilter[]): RangeSliderFilter[] {
  return Array.from(new Set(arr));
}

export default async function DriversPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  
  const subslug = slug[0] || null;
  const subsubslug = slug[1] || null;

  if(!subslug){
    let neededSpec = allproducts
    const [allTypes, allBrand, products] = await getAllDriversData(neededSpec)
    let allSpecsCombined: Record<string, ChildSpecificationProp[]> = {}
    neededSpec.forEach((specParent) => {
      const matchingSpecs: ChildSpecificationProp[] = []
        
      if(specParent === 'type'){
        products.forEach((prod) => {
          prod.allCat.map((subprod) => {
            if(subprod.category.type === 'Sub Sub Category'){
              const found = allTypes.find((val) => val.slug === subprod.category.slug)
              found && matchingSpecs.push({
                childname: "Type",
                value: subprod.category.name,
                notes: '',
                slug: 'type',
                unit: ''
              })
            }
          })
        })
      }
      else if(specParent === 'series'){
        products.forEach((prod) => {
          prod.allCat.map((subprod) => {
            if(subprod.category.type === 'Sub Category'){
              const found = allBrand.find((val) => val.slug === subprod.category.slug)
              found && matchingSpecs.push({
                childname: "Series",
                value: subprod.category.name,
                notes: '',
                slug: 'series',
                unit: ''
              })
            }
          })
        })
      }
      else{
        products.forEach((prod) => {
          prod.connectorSpecifications.forEach((spec) => {
            if (spec.dynamicspecification.slug === specParent) {
              matchingSpecs.push({
                childname: spec.dynamicspecification.name,
                value: spec.value,
                notes: spec.notes,
                slug: spec.dynamicspecification.slug,
                unit: spec.dynamicspecification.unit
              })
            }
          })
        })
      }

      allSpecsCombined[specParent] = matchingSpecs
    })
    let allSizes : string[] = []
    let allSpecs: Record<string, ChildSpecificationProp[]> = allSpecsCombined
    let tempSize: ChildSpecificationProp[] = []
    let finalTemp: AllFilterProductsOnlyType[] = []
    products.map((val: any) => {
      tempSize.push({
        childname: "Size",
        value: val.size.name,
        slug: 'size',
        notes: '',
        unit: `"`
      })
      allSizes.push(val.size.name)
      let alltempSpec: ChildSpecificationProp[] = []
      val.connectorSpecifications.map((spec: any) => {
        let tempSpec: ChildSpecificationProp = {
          childname: spec.dynamicspecification.name,
          value: spec.value,
          slug: spec.dynamicspecification.slug,
          notes: spec.notes,
          unit: spec.dynamicspecification.unit
        }
        alltempSpec.push(tempSpec)
      })
  
      for (const key in allSpecs) {
        if (key === 'type'){
          val.allCat.map((cat: any) => {
            if(cat.category.type === 'Sub Sub Category') {
              let tempSpec: ChildSpecificationProp = {
                childname: "Type",
                value: cat.category.name,
                slug: "type",
                notes: '',
                unit: ''
              }
              alltempSpec.push(tempSpec)
            }
          })
        }
        else if (key === 'series'){
          val.allCat.map((cat: any) => {
            if(cat.category.type === 'Sub Category') {
              let tempSpec: ChildSpecificationProp = {
                childname: "Series",
                value: cat.category.name,
                slug: "series",
                notes: '',
                unit: ''
              }
              alltempSpec.push(tempSpec)
            }
          })
        }
      }
      
  
      let temp: AllFilterProductsOnlyType = {
        products: {
          id: val.id,
          name: val.name,
          slug: val.slug,
          cover_img_url: val.cover_img_url
        },
        size: {
          name: val.size.value,
          value: val.size.name
        },
        specs: alltempSpec
      }
      finalTemp.push(temp)
    })
  
    allSpecs['size'] = tempSize
    for (const key in allSpecs) {
      if (allSpecs[key]?.length === 0) {
        delete allSpecs[key]
      }
    }
    
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Speaker Drivers",
    "description": "All drivers from Legacy Speaker.",
    "url": `${baseUrl}/drivers`,
    "itemListElement": finalTemp.map((driver, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/products/${driver.products.slug}`,
        "name": driver.products.name,
        "description": driver.products.name,
        "image": `${baseUrl}${driver.products.cover_img_url}`,
        "sku": driver.products.slug || driver.products.id,
        "brand": {
          "@type": "Brand",
          "name": "Legacy Speaker"
        }
      }
    }))
  } 

  return (
    <div className="bg-white -z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="sr-only">All Drivers | Legacy Speaker</h1>
      <div className="relative w-full py-8 h-fit">
        <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><Loader/></div>}>
          <DriversPageWithData tempDataPromise={Promise.resolve([finalTemp, allSpecs])} />
        </Suspense>
      </div>
    </div>
  );
  
  }

  if(subslug && !subsubslug) {

    const [allTypes, allBrand, products, neededSpec] = await getDriverData(subslug)

    

    let allSpecsCombined: Record<string, ChildSpecificationProp[]> = {}
    neededSpec.forEach((specParent) => {
      const matchingSpecs: ChildSpecificationProp[] = []
      
      if(specParent === 'type'){
        products.forEach((prod) => {
          prod.allCat.map((subprod) => {
            if(subprod.category.type === 'Sub Sub Category'){
              const found = allTypes.find((val) => val.slug === subprod.category.slug)
              found && matchingSpecs.push({
                childname: "Type",
                value: subprod.category.name,
                notes: '',
                slug: 'type',
                unit: ''
              })
            }
          })
        })
      }
      else if(specParent === 'series'){
        products.forEach((prod) => {
          prod.allCat.map((subprod) => {
            if(subprod.category.type === 'Sub Category'){
              const found = allBrand.find((val) => val.slug === subprod.category.slug)
              found && matchingSpecs.push({
                childname: "Series",
                value: subprod.category.name,
                notes: '',
                slug: 'series',
                unit: ''
              })
            }
          })
        })
      }
      else{
        products.forEach((prod) => {
          prod.connectorSpecifications.forEach((spec) => {
            if (spec.dynamicspecification.slug === specParent) {
              matchingSpecs.push({
                childname: spec.dynamicspecification.name,
                value: spec.value,
                notes: spec.notes,
                slug: spec.dynamicspecification.slug,
                unit: spec.dynamicspecification.unit
              })
            }
          })
        })
      }

      allSpecsCombined[specParent] = matchingSpecs
    })
    let allSizes : string[] = []
    let allSpecs: Record<string, ChildSpecificationProp[]> = allSpecsCombined
    let tempSize: ChildSpecificationProp[] = []
    let finalTemp: AllFilterProductsOnlyType[] = []
    products.map((val: any) => {
      tempSize.push({
        childname: "Size",
        value: val.size.name,
        slug: 'size',
        notes: '',
        unit: `"`
      })
      allSizes.push(val.size.name)
      let alltempSpec: ChildSpecificationProp[] = []
      val.connectorSpecifications.map((spec: any) => {
        let tempSpec: ChildSpecificationProp = {
          childname: spec.dynamicspecification.name,
          value: spec.value,
          slug: spec.dynamicspecification.slug,
          notes: spec.notes,
          unit: spec.dynamicspecification.unit
        }
        alltempSpec.push(tempSpec)
      })

      for (const key in allSpecs) {
        if (key === 'type'){
          val.allCat.map((cat: any) => {
            if(cat.category.type === 'Sub Sub Category') {
              let tempSpec: ChildSpecificationProp = {
                childname: "Type",
                value: cat.category.name,
                slug: "type",
                notes: '',
                unit: ''
              }
              alltempSpec.push(tempSpec)
            }
          })
        }
        else if (key === 'series'){
          val.allCat.map((cat: any) => {
            if(cat.category.type === 'Sub Category') {
              let tempSpec: ChildSpecificationProp = {
                childname: "Series",
                value: cat.category.name,
                slug: "series",
                notes: '',
                unit: ''
              }
              alltempSpec.push(tempSpec)
            }
          })
        }
      }
      

      let temp: AllFilterProductsOnlyType = {
        products: {
          id: val.id,
          name: val.name,
          slug: val.slug,
          cover_img_url: val.cover_img_url
        },
        size: {
          name: val.size.value,
          value: val.size.name
        },
        specs: alltempSpec
      }
      finalTemp.push(temp)
    })

    allSpecs['size'] = tempSize
    for (const key in allSpecs) {
      if (allSpecs[key]?.length === 0) {
        delete allSpecs[key]
      }
    }
    
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
  
  const subCatNameResult = await getOneDriverData(subslug);

  const subCatName = subCatNameResult.status === 'fulfilled' && subCatNameResult.value ? subCatNameResult.value : { name: '', description: '' };
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Speaker Drivers",
    "description":  subslug && subslug!= "" ? "The best ".concat(subslug, " series from Legacy Speaker."): 'All drivers from Legacy Speaker.',
    "url": subslug && subslug!= "" ? `${baseUrl}/drivers/${subslug}` : `${baseUrl}/drivers`,
    "itemListElement": finalTemp.map((driver: AllFilterProductsOnlyType, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/products/${driver.products.slug}`,
        "name": driver.products.name,
        "description": driver.products.name,
        "image": `${baseUrl}${driver.products.cover_img_url}`,
        "sku": driver.products.slug || driver.products.id,
        "brand": {
          "@type": "Brand",
          "name": "Legacy Speaker"
        }
      }
    }))
  }

  return (
    <div className="bg-white -z-10">
      <Suspense fallback={<FullScreenLoader isVisible/>}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1 className="sr-only">{subCatName.name} Series | Legacy Speaker</h1>
        <div className="relative w-full py-8 h-fit">
          {showserver?
              <AllDriversandFiltersProducts data={finalTemp} slider={sliderRows} checkbox={checkboxRows} showFilters={showserver} />
          :
            <div className="md:grid md:grid-cols-4">
                <AllDriversandFiltersProducts data={finalTemp} slider={sliderRows} checkbox={checkboxRows} showFilters={showserver} />
            </div>
          }
        </div>
      </Suspense>
    </div>
  );
  }
  else{
    const [allTypes, allBrand, products, neededSpec] = await getData(subslug);

    let allSpecsCombined: Record<string, ChildSpecificationProp[]> = {}
    neededSpec.forEach((specParent) => {
      const matchingSpecs: ChildSpecificationProp[] = []
      
      if(specParent === 'type'){
        products.forEach((prod) => {
          prod.allCat.map((subprod) => {
            if(subprod.category.type === 'Sub Sub Category'){
              const found = allTypes.find((val) => val.slug === subprod.category.slug)
              found && matchingSpecs.push({
                childname: "Type",
                value: subprod.category.name,
                notes: '',
                slug: 'type',
                unit: ''
              })
            }
          })
        })
      }
      else if(specParent === 'series'){
        products.forEach((prod) => {
          prod.allCat.map((subprod) => {
            if(subprod.category.type === 'Sub Category'){
              const found = allBrand.find((val) => val.slug === subprod.category.slug)
              found && matchingSpecs.push({
                childname: "Series",
                value: subprod.category.name,
                notes: '',
                slug: 'series',
                unit: ''
              })
            }
          })
        })
      }
      else{
        products.forEach((prod) => {
          prod.connectorSpecifications.forEach((spec) => {
            if (spec.dynamicspecification.slug === specParent) {
              matchingSpecs.push({
                childname: spec.dynamicspecification.name,
                value: spec.value,
                notes: spec.notes,
                slug: spec.dynamicspecification.slug,
                unit: spec.dynamicspecification.unit
              })
            }
          })
        })
      }

      allSpecsCombined[specParent] = matchingSpecs
    })
    let allSizes : string[] = []
    let allSpecs: Record<string, ChildSpecificationProp[]> = allSpecsCombined
    let tempSize: ChildSpecificationProp[] = []
    let finalTemp: AllFilterProductsOnlyType[] = []
    products.map((val: any) => {
      tempSize.push({
        childname: "Size",
        value: val.size.name,
        slug: 'size',
        notes: '',
        unit: `"`
      })
      allSizes.push(val.size.name)
      let alltempSpec: ChildSpecificationProp[] = []
      val.connectorSpecifications.map((spec: any) => {
        let tempSpec: ChildSpecificationProp = {
          childname: spec.dynamicspecification.name,
          value: spec.value,
          slug: spec.dynamicspecification.slug,
          notes: spec.notes,
          unit: spec.dynamicspecification.unit
        }
        alltempSpec.push(tempSpec)
      })

      for (const key in allSpecs) {
        if (key === 'type'){
          val.allCat.map((cat: any) => {
            if(cat.category.type === 'Sub Sub Category') {
              let tempSpec: ChildSpecificationProp = {
                childname: "Type",
                value: cat.category.name,
                slug: "type",
                notes: '',
                unit: ''
              }
              alltempSpec.push(tempSpec)
            }
          })
        }
        else if (key === 'series'){
          val.allCat.map((cat: any) => {
            if(cat.category.type === 'Sub Category') {
              let tempSpec: ChildSpecificationProp = {
                childname: "Series",
                value: cat.category.name,
                slug: "series",
                notes: '',
                unit: ''
              }
              alltempSpec.push(tempSpec)
            }
          })
        }
      }
      

      let temp: AllFilterProductsOnlyType = {
        products: {
          id: val.id,
          name: val.name,
          slug: val.slug,
          cover_img_url: val.cover_img_url
        },
        size: {
          name: val.size.value,
          value: val.size.name
        },
        specs: alltempSpec
      }
      finalTemp.push(temp)
    })

    allSpecs['size'] = tempSize
    for (const key in allSpecs) {
      if (allSpecs[key]?.length === 0) {
        delete allSpecs[key]
      }
    }
  
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
  
  const [subCatNameResult, subSubCatNameResult] = await getFinalData(subslug, subsubslug ?? '');

  const subCatName = subCatNameResult.status === 'fulfilled' && subCatNameResult.value ? subCatNameResult.value : { name: '', description: '' };
  const subSubCatName = subSubCatNameResult.status === 'fulfilled' && subSubCatNameResult.value ? subSubCatNameResult.value : { name: '', description: '' };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Speaker Drivers",
    "description":  subslug && subsubslug && subslug!= "" && subsubslug != "" ? "The best ".concat(subslug, " ", subsubslug, " series from Legacy Speaker."): 'All drivers from Legacy Speaker.',
    "url": subslug && subsubslug && subslug!= "" && subsubslug != "" ? `${baseUrl}/drivers/${subslug}/${subsubslug}` : `${baseUrl}/drivers/`,
    "itemListElement": finalTemp.map((driver, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/products/${driver.products.slug}`,
        "name": driver.products.name,
        "description": driver.products.name,
        "image": `${baseUrl}${driver.products.cover_img_url}`,
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
        <AllDriversandFiltersProducts data={finalTemp} slider={sliderRows} checkbox={[]} showFilters={showserver}/>
      </Suspense>
    </div>
  );
  }
}

