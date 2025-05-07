import getAllProductsJsonld from "@/app/(legacy)/actions/jsonLd/get-all-products-jsonld";
import ProductByCategoryPage from "./pageClient";

export default async function DriversPage() {
  const allprodserver = await getAllProductsJsonld(); // SSR fetch

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Speaker Drivers",
    "description": "All drivers from Legacy Speaker.",
    "url": "https://legacy.us.com/drivers",
    "itemListElement": allprodserver.map((driver, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "url": `https://legacy.us.com/products/${driver.slug}`,
        "name": driver.name,
        "description": driver.name,
        "image": `https://legacy.us.com${driver.coverUrl}`,
        "sku": driver.slug || driver.id,
        "brand": {
          "@type": "Brand",
          "name": "Legacy Speaker"
        }
      }
    }))
  }  

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductByCategoryPage />
    </>
  );
}