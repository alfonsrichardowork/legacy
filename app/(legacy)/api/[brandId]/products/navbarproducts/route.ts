import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        brandId: params.brandId,
        isArchived: false,
      },
      select:{
          name: true,
          slug: true,
          id: true,
          cover_img_url: true
      }
    });

    const productIds = products.map(product => product.id);

    const categories = await prismadb.allproductcategory.findMany({
      where:{
        productId:{
          in: productIds
        }
      },
      select:{
        category: {
          select: {
            type: true,
            name: true,
          }
        },
        productId: true
      }
    })
    
  const productsWithCategoriesandImage = products.map(product => {
      const productCategories = categories.filter(category => category.productId === product.id);
      
      const categoryDetails = productCategories.map(category => ({
      type: category.category.type,
      name: category.category.name,
      }));
  
      return {
        productName: product.name,
        productSlug: product.slug,
        categories: categoryDetails,
        url: product.cover_img_url
      };
  });

  const sortedProducts = productsWithCategoriesandImage.sort((a, b) => a.productSlug.localeCompare(b.productSlug));
    return NextResponse.json(sortedProducts);


  } catch (error) {
    console.log('[NAVBAR_PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};