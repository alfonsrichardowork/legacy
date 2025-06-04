import getAllProductsBySubSubCategoryJsonld from "@/app/(legacy)/actions/jsonLd/get-all-products-by-sub-sub-category-jsonld";
import ProductBySubSubCategoryPage from "./pageClient";
import getSubCatNameBySlug from "@/app/(legacy)/actions/get-SubCat_Name";
import getSubSubCatNameBySlug from "@/app/(legacy)/actions/get-SubSubCat_Name";

type Props = {
  params: Promise<{ driversSubCategory: string, driversSubSubCategory: string }>
}

export default async function SubSubDriversPage(props: Props) {
  let driversubcat = (await props.params).driversSubCategory
  let driversubsubcat = (await props.params).driversSubSubCategory
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const [subCatNameResult, subSubCatNameResult] = await Promise.allSettled([
    getSubCatNameBySlug(driversubcat),
    getSubSubCatNameBySlug(driversubsubcat),
  ]);

  const subCatName = subCatNameResult.status === 'fulfilled' ? subCatNameResult.value : { name: '' };
  const subSubCatName = subSubCatNameResult.status === 'fulfilled' ? subSubCatNameResult.value : { name: '' };
  const allprodserver = await getAllProductsBySubSubCategoryJsonld(driversubcat, driversubsubcat); // SSR fetch

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Speaker Drivers",
    "description":  driversubcat && driversubsubcat && driversubcat!= "" && driversubsubcat != "" ? "The best ".concat(driversubcat, " ", driversubsubcat, " series from Legacy Speaker."): 'All drivers from Legacy Speaker.',
    "url": driversubcat && driversubsubcat && driversubcat!= "" && driversubsubcat != "" ? `${baseUrl}/drivers/${driversubcat}/${driversubsubcat}` : `${baseUrl}/drivers/`,
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
      <h1 className="sr-only">{subCatName.name} {subSubCatName.name} Series | Legacy Speaker</h1>
      <ProductBySubSubCategoryPage params={props.params} />
    </>
  );
}