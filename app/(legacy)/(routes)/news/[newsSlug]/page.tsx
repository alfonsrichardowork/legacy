import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/(legacy)/components/ui/breadcrumb";
import { LazyImageContact } from "@/app/(legacy)/components/lazyImageContact";
import DompurifyContent from "@/app/(legacy)/components/dompurifyText";
import prismadb from "@/lib/prismadb";
import { cacheLife } from "next/cache";

export async function generateStaticParams() {
  const allNews = await prismadb.news.findMany({select: {slug: true}})
  return allNews.map(({ slug }) => ({
    newsSlug: slug,
  }))
}

async function getData(newsSlug: string) {
  'use cache'
  cacheLife('minutes')
  const oneNews = await prismadb.news.findFirst({
    where: {
      slug: newsSlug
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
      news_img_url: true
    }
  });
  return oneNews
}

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ newsSlug: string }>
}) {
  const { newsSlug } = await params
  const oneNews = await getData(newsSlug);
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  


  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  if(!oneNews){
    return null
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": oneNews.title,
    "image": oneNews.news_img_url,
    "description": oneNews?.description,
    "datePublished": oneNews?.event_date,
    "dateModified": oneNews?.updatedAt,
    "author": {
      "@type": "Organization",
      "name": "Legacy Speaker"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Legacy Speaker",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/legacy/logo_legacy.webp`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/news/${oneNews.slug}`
    }
  };
  

  return (
    <>
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
        <div className="bg-white -z-10">
            <div className="container mx-auto xl:px-36 lg:px-20 px-10 py-8">
              {/* Breadcrumb */}
              <div className="pb-6">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/news">All News</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{oneNews.title.length > 10 ? `${oneNews.title.slice(0, 10)}...` : oneNews.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Content Section */}
              <div className="w-full text-black">
                {/* Image with reserved space */}
                <div className="relative w-full sm:w-1/3 aspect-square">
                {oneNews.news_img_url !== '' &&
                  <LazyImageContact src={oneNews.news_img_url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${oneNews.news_img_url}` : oneNews.news_img_url} alt={oneNews.title}/>
                }
                </div>

                {/* Title and Date */}
                <h1 className="lg:text-3xl text-xl text-black font-bold py-2">
                  {oneNews.title}
                </h1>
                <h2 className="lg:text-base text-sm text-gray-500 pb-8">
                  {formatDate(oneNews.event_date.toString())}
                </h2>

                {/* Description */}
                <DompurifyContent text={oneNews.description} />
              </div>
            </div>
        </div>
    </>
  );
}

