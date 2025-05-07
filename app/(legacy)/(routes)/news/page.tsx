import getAllNews from "../../actions/get-all-news";
import NewsClient from "./pageClient";


export default async function News() { 
  let allnewsserver = await getAllNews('all');
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",      
    "url": "https://legacy.us.com/news", 
    "name": "Legacy Speaker",
    "description": "All news from Legacy Speaker.",
    "itemListElement": allnewsserver?.map((news, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": news.title,
        "image": `https://legacy.us.com${news.news_img_url}`,
        "url": `https://legacy.us.com/news/${news.slug}`,
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