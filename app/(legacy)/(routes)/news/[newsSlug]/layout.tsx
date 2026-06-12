import prismadb from "@/lib/prismadb";
import { Metadata, ResolvingMetadata } from "next"

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
  const onenews = await prismadb.news.findFirst({
    where: {
      slug: params.newsSlug
    },
    select: {
      id: true,
      title: true,
      slug: true,
      link_placeholder: true,
      link_url: true,
      description: true,
      event_date: true,
      updatedAt: true,
      news_img: {
        select: {
          url: true
        }
      }
    }
  });
  if(!onenews) {
    return {
      title: 'No News Found'
    }
  }
  const previousImages = (await parent).openGraph?.images || []
  const truncatedDescription = stripHtmlAndTruncate(onenews.description, 30);
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  return {
    title: onenews.title.concat(" | Legacy Speaker"),
    description: truncatedDescription,
    applicationName: 'Legacy Speaker',
    keywords: [
      onenews.title,
      onenews.slug,
      "Legacy News",
      "Berita Legacy Speaker",
      "Speaker Indonesia",
    ],
    openGraph: {
      title: `${onenews.title} | Legacy Speaker`,
      description: truncatedDescription,
      url: `${baseUrl}/news/${onenews.slug}`,
      siteName: "Legacy Speaker",
      images: [
        // {
        //   url: `https://www.legacy.us.com${onenews.news_img_url}`,
        //   width: 1200,
        //   height: 630,
        //   alt: onenews.title,
        // },
        {
          url: `${baseUrl}${onenews.news_img[0]?.url}`,
          width: 800,
          height: 800,
          alt: onenews.title,
        },
        ...previousImages,
      ],
      type: "article",
      publishedTime: onenews.event_date.toString(), 
    },
    twitter: {
      card: "summary_large_image",
      title: `${onenews.title} | Legacy Speaker`,
      description: truncatedDescription,
      images: [    
        {
          url: `${baseUrl}${onenews.news_img[0]?.url}`,
          width: 800,
          height: 800,
          alt: onenews.title,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/news/${onenews.slug}`,
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