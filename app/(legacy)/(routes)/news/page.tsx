export const dynamic = "force-dynamic";

import { Suspense } from "react";
import getAllNews from "../../actions/get-all-news";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import { NewsType } from "../../types";
import { Loader } from "../../components/ui/loader";
import NewsWithData from "./withData";

async function NewsJsonLd() {
  const newsData: NewsType[] = await getAllNews('all')
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",      
    "url": `${baseUrl}/news`, 
    "name": "Legacy Speaker",
    "description": "All news from Legacy Speaker.",
    "itemListElement": newsData?.map((news, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": news.title,
        "image": `${baseUrl}${news.news_img_url}`,
        "url": `${baseUrl}/news/${news.slug}`,
        "description": news.description,
        "datePublished": news.event_date,
        "dateModified": news.updatedAt,  
        "author": {
          "@type": "Organization",
          "name": "Legacy Speaker"
        },
      }
    }))
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

export default function News() { 
  const newsDataPromise = getAllNews('all');

  return (
    <div className="bg-white -z-10">
      <NewsJsonLd />
      <div className="relative w-full bg-white p-8 h-fit container mx-auto xl:px-36 lg:px-20 px-10 ">
        <div className="pb-6">
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbPage><h1>All News</h1></BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><Loader/></div>}>
          <NewsWithData newsDataPromise={newsDataPromise} />
        </Suspense>
      </div>
    </div>
  );
}