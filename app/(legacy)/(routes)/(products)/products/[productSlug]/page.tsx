import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import FullScreenLoader from "@/app/(legacy)/components/loadingNoScroll";
import { Suspense } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/app/(legacy)/components/ui/breadcrumb";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SpecificationTable from "@/app/(legacy)/components/spec-table";
import prismadb from "@/lib/prismadb";
import { AllCategory, ChildSpecificationProp, FilesProp, Size, SpecificationProp } from "@/app/(legacy)/types";
import { cacheLife } from "next/cache";



export async function generateStaticParams() {
  const allProducts = await prismadb.product.findMany({select: {slug: true}})
  return allProducts.map(({ slug }) => ({
    productSlug: slug,
  }))
}

const all_desc_style = "text-left xl:text-base sm:text-sm text-xs text-black p-0 py-1"
const all_sub_title_style = "text-left font-bold xl:text-4xl text-2xl text-black"

const SwiperCoverDynamic = dynamic(() => import("@/app/(legacy)/components/swipercarouselcoverandcatalogues"), {
    loading: () => <FullScreenLoader isVisible/>,
});
const SwiperGraphImpedanceDynamic = dynamic(() => import("@/app/(legacy)/components/swipercarouselgraphimpedance"), {
    loading: () => <FullScreenLoader isVisible/>,
});
const DompurifyContentDynamic = dynamic(() => import("@/app/(legacy)/components/dompurifyText"), {
    loading: () => <FullScreenLoader isVisible/>,
});

type Props = {
  params: Promise<{ productSlug?: string }>
}

async function getData(productSlug: string) {
  'use cache'
  cacheLife('minutes')
  let data = await prismadb.product.findFirst({
    where: {
        slug: productSlug
    },
    include: {
      allCat: {
        include: {
          category: {
            select: {
              name: true,
              slug: true,
              type: true
            }
          }
        }
      },
      images_catalogues: true,
      multipleDatasheetProduct: true,
      size: true,
      connectorSpecifications: {
        include: {
          dynamicspecification: true,
          dynamicspecificationParent: true,
          dynamicspecificationSubParent: true
        }
      }
    }
  })
  return data
}


export default async function SingleProductJsonLd(props: Props) {
    const { productSlug = '' } = await props.params;
    const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
    const data = await getData(productSlug)
    if(!data){
        redirect('/notfound')
    }

    const specsCombined = (data.connectorSpecifications ?? []).reduce<SpecificationProp[]>(
            (acc, connector) => {
              const parentname = connector.dynamicspecificationParent?.name ?? "";
              const subparentname = connector.dynamicspecificationSubParent?.name ?? "";
    
              const child: ChildSpecificationProp = {
                childname: connector.dynamicspecification?.name ?? "",
                value: connector.value ?? "",
                notes: connector.notes ?? "",
                slug: connector.dynamicspecification?.slug ?? "",
                unit: connector.dynamicspecification?.unit ?? "",
              };
    
              const existingGroup = acc.find(
                (group) =>
                  group.parentname === parentname &&
                  group.subparentname === subparentname
              );
    
              if (existingGroup) {
                existingGroup.child.push(child);
              } else {
                acc.push({ parentname, subparentname, child: [child] });
              }
    
              return acc;
            },
            []
          );
    
          // ✅ Build lookup maps for faster access
          const parentPriorityMap = new Map(
            data.connectorSpecifications.map((c) => [
              c.dynamicspecificationParent?.name ?? "",
              c.dynamicspecificationParent?.priority ?? 0,
            ])
          );
    
          const subParentPriorityMap = new Map(
            data.connectorSpecifications.map((c) => [
              c.dynamicspecificationSubParent?.name ?? "",
              c.dynamicspecificationSubParent?.priority ?? 0,
            ])
          );
    
          const childPriorityMap = new Map(
            data.connectorSpecifications.map((c) => [
              c.dynamicspecification?.name ?? "",
              c.dynamicspecification?.priority ?? 0,
            ])
          );
    
          // ✅ Sort parent/subparent groups by priority
          specsCombined.sort((a, b) => {
            const aParentPriority = Number(parentPriorityMap.get(a.parentname)) ?? 0;
            const bParentPriority = Number(parentPriorityMap.get(b.parentname)) ?? 0;
            if (aParentPriority !== bParentPriority)
              return aParentPriority - bParentPriority;
    
            const aSubPriority = Number(subParentPriorityMap.get(a.subparentname)) ?? 0;
            const bSubPriority = Number(subParentPriorityMap.get(b.subparentname)) ?? 0;
            if (aSubPriority !== bSubPriority)
              return aSubPriority - bSubPriority;
    
            return 0;
          });
    
          // ✅ Sort children inside each group by their own priority
          specsCombined.forEach((group) => {
            group.child.sort((a, b) => {
              const aPriority = Number(childPriorityMap.get(a.childname)) ?? 0;
              const bPriority = Number(childPriorityMap.get(b.childname)) ?? 0;
              return aPriority - bPriority;
            });
          });
    

    let prod_cat: AllCategory[] = []
    let prod_sub_cat: AllCategory[] = []
    let prod_sub_sub_cat: AllCategory[] = []
    let all_image_catalogues : Array<FilesProp> = []
    let all_datasheet : Array<FilesProp> = []
    data.allCat && data.allCat.length > 0 && data.allCat.map((cat: any, i: number) => {
      let temp: AllCategory = {
        id: cat.id,
        name: cat.category.name,
        slug: cat.category.slug
      }
      if(cat.category.type === "Category"){
        prod_cat.push(temp)
      }
      else if(cat.category.type === "Sub Category"){
        prod_sub_cat.push(temp)
      }
      else{
        prod_sub_sub_cat.push(temp)
      }
    })

    
        data.images_catalogues && data.images_catalogues.length > 0 && data.images_catalogues.map((img: any) => {
          all_image_catalogues.push({
            name: img.name,
            url: img.url,
            productId: img.id
          })
        })
    
        data.multipleDatasheetProduct && data.multipleDatasheetProduct.length > 0 && data.multipleDatasheetProduct.map((img: any) => {
          all_datasheet.push({
            name: img.name,
            url: img.url,
            productId: img.id
          })
        })
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.name,
        "description": data.name,
        "image": data.cover_img_url,
        "sku": data.slug,
        "brand": {
          "@type": "Brand",
          "name": "Legacy Speaker"
        },
        "url":`${baseUrl}/products/${data.slug}`,
        "isPartOf": "Legacy Speaker",
        "provider": {
          "@type": "Organization",
          "name": "Legacy Speaker"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}`
        }
      };
      

    return(
      <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:py-8 lg:py-6 py-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Suspense fallback={<FullScreenLoader isVisible/>}>
                <div className="pb-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            {prod_cat[0] && (
                                <>
                                    <BreadcrumbItem>
                                    <BreadcrumbLink href={`/${prod_cat[0].slug}`}>{prod_cat[0].name}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </>
                                )}

                                {prod_cat[0] && prod_sub_cat[0] && (
                                <>
                                    <BreadcrumbItem>
                                    <BreadcrumbLink href={`/${prod_cat[0].slug}/${prod_sub_cat[0].slug}`}>
                                        {prod_sub_cat[0].name}
                                    </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </>
                                )}

                                {prod_cat[0] && prod_sub_cat[0] && prod_sub_sub_cat[0] && (
                                <>
                                    <BreadcrumbItem>
                                    <BreadcrumbLink href={`/${prod_cat[0].slug}/${prod_sub_cat[0].slug}/${prod_sub_sub_cat[0].slug}`}>
                                        {prod_sub_sub_cat[0].name}
                                    </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </>
                                )}

                            <BreadcrumbItem>
                            <BreadcrumbPage>{data.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="block md:flex">
                {/* Right Column for Typography */}
                <div className="md:order-2 order-1 md:w-1/2 justify-center md:h-1/2 block w-full h-full md:pl-2 md:pb-0 pb-4">
                    <div className="flex flex-col w-full">
                        <div>
                            <div className="w-full h-fit pb-4">
                              <SwiperCoverDynamic cover={data.cover_img_url} image_catalogues={all_image_catalogues} name={data.name}/>
                            </div>
                            <div className="w-full h-fit pb-4">
                              <SwiperGraphImpedanceDynamic drawing={data.drawing_img_url} graph={data.graph_img_url} impedance={data.impedance_img_url} name={data.name}/>
                            </div>
                            {all_datasheet && 
                                <div className="pt-4 space-y-2">
                                    {all_datasheet.length > 0 && all_datasheet.map((sheet, index) => (
                                    sheet?.url && (
                                        <div key={index} className="mb-2">
                                        <Link href={sheet.url} target="_blank" rel="noopener noreferrer">
                                        <div className="w-full bg-blue-500 text-white flex justify-center items-center py-2 rounded-lg hover:bg-foreground transition-all ease-in-out duration-200">
                                            <FileDown size={20} className="mr-2" />
                                            <div>{sheet.name || "Download Manual"}</div>
                                        </div>
                                        </Link>
                                        </div>
                                    )
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {/* Left Column for Images */}
                <div className="md:order-1 order-2 md:w-1/2 md:h-1/2 block w-full h-full pr-2">
                    {prod_sub_sub_cat.length > 0 && 
                        <div className={`${prod_sub_sub_cat.length != 0 ? '' : 'hidden'}`}>
                            {prod_sub_sub_cat.map((subsubcategory, index) => (
                                <div key={index} className="text-2xl text-gray-500 font-bold pb-4">
                                    {subsubcategory.name}
                                </div>
                            ))}
                        </div>
                    }

                    {data.name && <h1 className={`${all_sub_title_style} pb-4`}>{data.name}</h1>}

                    {prod_sub_sub_cat.length > 0 && (
                        <h2 className={`sr-only`}>
                            {prod_sub_sub_cat.map((subsubcategory, index) => (
                                    subsubcategory.name
                            ))}
                        </h2>
                    )}

                    <Separator className="bg-foreground w-56 h-2" />

                    {data.description && data.description != '' && data.description != '-' && data.description != '<p></p>' && 
                        <>
                            <h2 className="text-2xl text-gray-500 font-bold py-4">Deskripsi</h2>
                            <h3 className={`${all_desc_style} tiptap`}>
                                <DompurifyContentDynamic text={data.description} />
                            </h3>
                        </>
                    }

                
                    {specsCombined && specsCombined.length > 0 ?
                        <div className="justify-start pt-4">
                            <SpecificationTable spec={specsCombined} styling={all_desc_style} stylingTitle={all_sub_title_style}/>
                        </div>
                        :
                        <div className="w-full flex items-center justify-center font-bold text-background md:h-96 h-20 text-3xl" >
                            Coming Soon!
                        </div>
                    }
                </div>
                </div>
            </Suspense>
        </div>
    );
}