import prismadb from "@/lib/prismadb";
import { Metadata, ResolvingMetadata } from "next"
import { cacheLife } from "next/cache";

type Props = {
  params: Promise<{ productSlug: string }>
}

async function getData(productSlug: string) {
  'use cache'
  cacheLife('minutes')
  const product = await prismadb.product.findFirst({
    where: {
      slug: productSlug
    },
    select: {
      name: true,
      slug: true,
      size: true,
      cover_img_url: true
    }
  })
  return product 
}


export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const product = await getData(params.productSlug)
  if(!product) {
    return {
      title: 'Product Not Found'
    }
  }
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
          url: `${baseUrl}${product.cover_img_url}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
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
          url: `${baseUrl}${product.cover_img_url}`,
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