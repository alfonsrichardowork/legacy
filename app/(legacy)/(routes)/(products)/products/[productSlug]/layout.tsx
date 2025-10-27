import getSingleMetadata from "@/app/(legacy)/actions/get-metadata-single-product"
import getAllProductsJsonld from "@/app/(legacy)/actions/jsonLd/get-all-products-jsonld";
import { AllProductsJsonType } from "@/app/(legacy)/types";
import { Metadata, ResolvingMetadata } from "next"

// export const revalidate = 86400
// export async function generateStaticParams() {
//   const allProducts : AllProductsJsonType[] = await getAllProductsJsonld();
//   if (!allProducts || allProducts.length === 0) {
//     return []; // no params generated
//   }
//   const onlySlug = allProducts.map((product) => product.slug);
//   return onlySlug.map((productSlug) => ({ productSlug }));
// }

type Props = {
  params: Promise<{ productSlug: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const product = await getSingleMetadata(params.productSlug)
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: product.name.concat(" | Legacy Speaker"),
    description: `Temukan spesifikasi dan fitur unggulan dari ${product.name}!`,
    applicationName: 'Legacy Speaker',
    keywords: [
      product.name,
      product.slug,
      product.size.value.toString().concat(`" driver`),
      product.size.value.toString().concat(` inch driver`)
    ],
    openGraph: {
      title: `${product.name} | Legacy Speaker`,
      description: `Temukan spesifikasi dan fitur unggulan dari ${product.name}!`,
      url: `${baseUrl}/products/${product.slug}`,
      siteName: "Legacy Speaker",
      images: [
        // {
        //   url: `${baseUrl}${product.coverUrl}`,
        //   width: 1200,
        //   height: 630,
        //   alt: product.name,
        // },
        {
          url: `${baseUrl}${product.coverUrl}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
        ...previousImages,
      ],
      locale: 'id_ID',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Legacy Speaker`,
      description: `Temukan spesifikasi dan fitur unggulan dari ${product.name}!`,
      images: [
        {
          url: `${baseUrl}${product.coverUrl}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/products/${product.slug}`,
    },
  }
}


export default function SingleProductLayout({
    children,
  }: {
    children: React.ReactNode
  }
)
{
  return(
    <>
      {children}
    </>
  )
  }