import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import FullScreenLoader from "@/app/(legacy)/components/loadingNoScroll";
import getProduct from "@/app/(legacy)/actions/get-one-product";
import { Suspense } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/app/(legacy)/components/ui/breadcrumb";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SpecificationTable from "@/app/(legacy)/components/spec-table";

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

export default async function SingleProductJsonLd(props: Props) {
    const { productSlug = '' } = await props.params;
    const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
    // const data = await getSingleMetadata(productSlug); // SSR fetch
    let data = await getProduct(productSlug)
    if(data.id === '' && data.slug === ''){
        redirect('/notfound')
    }
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data?.name? data.name : "",
        "description": data?.name? data.name : "",
        "image": data?.coverImg?.url ? `${baseUrl}${data.coverImg.url}` : '',
        "sku": data?.slug || data?.id,
        "brand": {
          "@type": "Brand",
          "name": "Legacy Speaker"
        },
        "url": data?.slug ? `${baseUrl}/products/${data.slug}` : `${baseUrl}`,
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
                {data &&
                    <>
                        <div className="pb-6">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    {data?.categories?.[0] && (
                                        <>
                                            <BreadcrumbItem>
                                            <BreadcrumbLink href={`/${data.categories[0].slug}`}>{data.categories[0].name}</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                        </>
                                        )}

                                        {data?.categories?.[0] && data?.sub_categories?.[0] && (
                                        <>
                                            <BreadcrumbItem>
                                            <BreadcrumbLink href={`/${data.categories[0].slug}/${data.sub_categories[0].slug}`}>
                                                {data.sub_categories[0].name}
                                            </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                        </>
                                        )}

                                        {data?.categories?.[0] && data?.sub_categories?.[0] && data?.sub_sub_categories?.[0] && (
                                        <>
                                            <BreadcrumbItem>
                                            <BreadcrumbLink href={`/${data.categories[0].slug}/${data.sub_categories[0].slug}/${data.sub_sub_categories[0].slug}`}>
                                                {data.sub_sub_categories[0].name}
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
                                    {data.coverImg && data.images_Catalogues &&
                                        <div className="w-full h-fit pb-4">
                                            <SwiperCoverDynamic cover={data.coverImg} image_catalogues={data.images_Catalogues} />
                                        </div>
                                    }
                                    {(data.drawing || data.graph || data.impedance) && 
                                        <div className="w-full h-fit pb-4">
                                            <SwiperGraphImpedanceDynamic drawing={data.drawing} graph={data.graph} impedance={data.impedance} />
                                        </div>
                                    }

                                    {data.datasheet && 
                                        <div className="pt-4 space-y-2">
                                            {data.datasheet.length > 0 && data.datasheet.map((sheet, index) => (
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
                            {data.sub_sub_categories.length > 0 && 
                                <div className={`${data.sub_sub_categories.length != 0 ? '' : 'hidden'}`}>
                                    {data.sub_sub_categories.map((subsubcategory, index) => (
                                        <div key={index} className="text-2xl text-gray-500 font-bold pb-4">
                                            {subsubcategory.name}
                                        </div>
                                    ))}
                                </div>
                            }

                            {data.name && <h1 className={`${all_sub_title_style} pb-4`}>{data.name}</h1>}

                            {data.sub_sub_categories.length > 0 && (
                                <h2 className={`sr-only`}>
                                    {data.sub_sub_categories.map((subsubcategory, index) => (
                                            subsubcategory.name
                                    ))}
                                </h2>
                            )}

                            <Separator className="bg-foreground w-56 h-2" />

                            {data.desc && data.desc != '' && data.desc != '-' && data.desc != '<p></p>' && 
                                <>
                                    <h2 className="text-2xl text-gray-500 font-bold py-4">Deskripsi</h2>
                                    <h3 className={`${all_desc_style} tiptap`}>
                                        <DompurifyContentDynamic text={data.desc} />
                                    </h3>
                                </>
                            }

                        
                            {data.specification && data.specification.length > 0 ?
                                <div className="justify-start pt-4">
                                    <SpecificationTable spec={data.specification} styling={all_desc_style} stylingTitle={all_sub_title_style}/>
                                </div>
                                :
                                <div className="w-full flex items-center justify-center font-bold text-background md:h-96 h-20 text-3xl" >
                                    Coming Soon!
                                </div>
                            }
                        </div>
                        </div>
                    </>
                }
            </Suspense>
        </div>
    );
}