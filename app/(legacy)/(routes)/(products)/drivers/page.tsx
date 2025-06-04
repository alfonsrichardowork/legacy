import getAllProductsJsonld from "@/app/(legacy)/actions/jsonLd/get-all-products-jsonld";
import ProductByCategoryPage from "./pageClient";

export default async function DriversPage() {
  const allprodserver = await getAllProductsJsonld(); // SSR fetch
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Speaker Drivers",
    "description": "All drivers from Legacy Speaker.",
    "url": `${baseUrl}/drivers`,
    "itemListElement": allprodserver.map((driver, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/products/${driver.slug}`,
        "name": driver.name,
        "description": driver.name,
        "image": `${baseUrl}${driver.coverUrl}`,
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
      <h1 className="sr-only">All Drivers | Legacy Speaker</h1>
      <ProductByCategoryPage />
    </>
  );
}