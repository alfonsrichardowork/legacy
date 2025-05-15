import ProductBySubCategoryPage from "./pageClient";
import getAllProductsBySubCategoryJsonld from "@/app/(legacy)/actions/jsonLd/get-all-products-by-sub-category-jsonld";

type Props = {
  params: Promise<{ driversSubCategory: string }>
}

export default async function SubDriversPage(props: Props) {
  let driversubcat = (await props.params).driversSubCategory
  const allprodserver = await getAllProductsBySubCategoryJsonld(driversubcat); // SSR fetch
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Speaker Drivers",
    "description":  driversubcat && driversubcat!= "" ? "The best ".concat(driversubcat, " series from Legacy Speaker."): 'All drivers from Legacy Speaker.',
    "url": driversubcat && driversubcat!= "" ? `${baseUrl}/drivers/${driversubcat}` : `${baseUrl}/drivers`,
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
      <ProductBySubCategoryPage params={props.params} />
    </>
  );
}