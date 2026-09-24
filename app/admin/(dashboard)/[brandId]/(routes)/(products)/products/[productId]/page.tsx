import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const ProductPage = async (
  props: {
    params: Promise<{ productId: string, brandId: string }>
  }
) => {
  const params = await props.params;
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images_catalogues: true,
      multipleDatasheetProduct: true,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      brandId: params.brandId,
    },
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          initialData={product}
          sizes={sizes}
        />
      </div>
    </div>
  );
}

export default ProductPage;
