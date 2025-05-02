import getSingleMetadata from "@/app/(legacy)/actions/get-metadata-single-product"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ productSlug: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
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
      url: `https://legacy.us.com/products/${product.slug}`,
      siteName: "Legacy Speaker",
      images: [
        // {
        //   url: `https://legacy.us.com${product.coverUrl}`,
        //   width: 1200,
        //   height: 630,
        //   alt: product.name,
        // },
        {
          url: `https://legacy.us.com${product.coverUrl}`,
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
          url: `https://legacy.us.com${product.coverUrl}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
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