import getAllNews from "../../actions/get-all-news";
import NewsClient from "./pageClient";


export default async function News() { 
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  let allnewsserver = await getAllNews('all');
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",      
    "url": `${baseUrl}/news`, 
    "name": "Legacy Speaker",
    "description": "All news from Legacy Speaker.",
    "itemListElement": allnewsserver?.map((news, index) => ({
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
          "name": "ACR"
        },
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsClient />
    </>
  );
}