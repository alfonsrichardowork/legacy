import prismadb from "@/lib/prismadb";
import { SpecForm } from "./components/specification-form";


const SpecPage = async (
  props: {
    params: Promise<{ productId: string, brandId: string }>
  }
) => {
  const params = await props.params;
  const spec = await prismadb.specification.findFirst({
    where: {
      productId: params.productId,
    },
  });

  const product = await prismadb.product.findFirst({
    where:{
      id: params.productId
    },
    select:{
      name: true
    }
  })

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SpecForm 
          initialData={spec!}
          product_name={product!.name}
        />
      </div>
    </div>
  );
}

export default SpecPage;
