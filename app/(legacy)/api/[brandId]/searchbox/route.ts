import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        brandId: params.brandId,
        isArchived: false,
      },
      select: {
        slug: true,
        name: true,
        id: true,
        size: true,
        cover_img_url: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    const productIds = products.map(product => product.id);

    const categories = await prismadb.allproductcategory.findMany({
      where:{
        productId:{
          in: productIds
        },
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
    
    const productsWithCategoriesandImage = products.map((product) => {
      const productCategories = categories.filter(category => category.productId === product.id);
      
      let tempName = ""
      const categoryDetails = productCategories.map(category => {
          tempName = tempName.concat(category.category.name, " ");
          return { tempName };
      });
    

      return {
        label: product.name,
        value: tempName,
        slug: product.slug,
        url: product.cover_img_url,
        categoryDetails: categoryDetails && categoryDetails.length > 2 ? categoryDetails[2]?.tempName : "",
      };
    });


  
    return NextResponse.json(productsWithCategoriesandImage);
  } catch (error) {
    console.log('[SEARCHBOX_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};