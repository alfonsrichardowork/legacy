import getAllProductsBySubSubCategoryJsonld from "@/app/(legacy)/actions/jsonLd/get-all-products-by-sub-sub-category-jsonld";
import ProductBySubSubCategoryPage from "./pageClient";

type Props = {
  params: Promise<{ driversSubCategory: string, driversSubSubCategory: string }>
}

export default async function SubSubDriversPage(props: Props) {
  let driversubcat = (await props.params).driversSubCategory
  let driversubsubcat = (await props.params).driversSubSubCategory
  const allprodserver = await getAllProductsBySubSubCategoryJsonld(driversubcat, driversubsubcat); // SSR fetch

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Speaker Drivers",
    "description":  driversubcat && driversubsubcat && driversubcat!= "" && driversubsubcat != "" ? "The best ".concat(driversubcat, " ", driversubsubcat, " series from Legacy Speaker."): 'All drivers from Legacy Speaker.',
    "url": driversubcat && driversubsubcat && driversubcat!= "" && driversubsubcat != "" ? "https://legacy.us.com/drivers/".concat(driversubcat, "/", driversubsubcat) : 'https://legacy.us.com/drivers/',
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
      <ProductBySubSubCategoryPage params={props.params} />
    </>
  );
}