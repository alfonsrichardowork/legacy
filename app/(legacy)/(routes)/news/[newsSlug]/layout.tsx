import getAllNewsGSP from "@/app/(legacy)/actions/get-all-news-gsp";
import getOneNews from "@/app/(legacy)/actions/get-one-news"
import { Metadata, ResolvingMetadata } from "next"

// export const revalidate = 86400
// export async function generateStaticParams() {
//   const allNews = await getAllNewsGSP();

//   if (!allNews || allNews.length === 0) {
//     return []; // no params generated
//   }

//   return allNews.map((newsSlug) => ({
//     newsSlug
//   }));
// }

type Props = {
  params: Promise<{ newsSlug: string }>
}

function stripHtmlAndTruncate(html: string, wordLimit: number = 30): string {
  // Remove HTML tags and decode entities
  const plainText = html.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ").trim();
  // Split into words and truncate
  const words = plainText.split(/\s+/);
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : plainText;
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const product = await getOneNews(params.newsSlug)
  const previousImages = (await parent).openGraph?.images || []
  const truncatedDescription = stripHtmlAndTruncate(product.description, 30);
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
    title: product.title.concat(" | Legacy Speaker"),
    description: truncatedDescription,
    applicationName: 'Legacy Speaker',
    keywords: [
      product.title,
      product.slug,
      "Legacy News",
      "Berita Legacy Speaker",
      "Speaker Indonesia",
    ],
    openGraph: {
      title: `${product.title} | Legacy Speaker`,
      description: truncatedDescription,
      url: `${baseUrl}/news/${product.slug}`,
      siteName: "Legacy Speaker",
      images: [
        // {
        //   url: `https://www.legacy.us.com${product.news_img_url}`,
        //   width: 1200,
        //   height: 630,
        //   alt: product.title,
        // },
        {
          url: `${baseUrl}${product.news_img_url}`,
          width: 800,
          height: 800,
          alt: product.title,
        },
        ...previousImages,
      ],
      type: "article",
      publishedTime: product.event_date.toString(), 
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Legacy Speaker`,
      description: truncatedDescription,
      images: [    
        {
          url: `${baseUrl}${product.news_img_url}`,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/news/${product.slug}`,
    }
  }
}

export default function SingleNewsLayout({
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