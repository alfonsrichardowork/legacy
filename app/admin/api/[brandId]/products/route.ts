import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/app/admin/actions';
import { image_catalogues, multipledatasheetproduct } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const slugify = (str: string): string => {
  const normalizedStr = str.replace(/["“”‟″‶〃״˝ʺ˶ˮײ]/g, "'");
  const strAfterQuote = normalizedStr.includes("'") ? normalizedStr.split("'")[1] : normalizedStr;
  const strBeforeSlash = strAfterQuote?.includes('/') ? strAfterQuote.split('/')[0] : strAfterQuote;
  const strWithoutSatori = strBeforeSlash?.replace(/SATORI/gi, '');
  return strWithoutSatori?.toLowerCase()
                         .replace(/[^a-z0-9]+/g, '-')
                         .replace(/(^-|-$)+/g, '') ?? '';
};

export async function POST(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {
    const session = await getSession();

    if(!session.isLoggedIn || !session){
      return NextResponse.json("expired_session")
    }
    
    if(!(await checkBearerAPI(session))){
      session.destroy();
      return NextResponse.json("invalid_token")
    }

    const body = await req.json();

    const { name, sizeId,  description, isFeatured, isArchived, isNewProduct, images_catalogues, cover_img_url, drawing_img_url, graph_img_url, impedance_img_url, multipleDatasheetProduct, series } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    

    const duplicates = await prismadb.product.findFirst({
      where:{
        name,
      }
    })

    if(duplicates){
      return NextResponse.json("duplicate")
    }

    try {
      const product = await prismadb.product.create({
        data: {
          name: name,
          slug: slugify(name),
          description,
          isFeatured,
          isArchived,
          isNewProduct,
          cover_img_url,
          impedance_img_url,
          graph_img_url,
          drawing_img_url,
          sizeId,
          series,
          updatedBy: session.name,
          brandId: params.brandId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      });


      if(images_catalogues.length!=0){
        images_catalogues.map(async (value: image_catalogues) => {
          if(value.url!=''){
            await prismadb.image_catalogues.create({
              data:{
                productId: product.id,
                url:value.url,
                name: value.name,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            })
          }
        })
      }

      if(multipleDatasheetProduct.length!=0){
        multipleDatasheetProduct.map(async (datasheet: multipledatasheetproduct) => {
          if(datasheet.url!=''){
            await prismadb.multipledatasheetproduct.create({
              data:{
                productId: product.id,
                url:datasheet.url,
                name: datasheet.name
              }
            })
          }
        })
      }

      await prismadb.product.update({
        where:{
          id: product.id
        },
        data: {
          updatedBy: session.name,
          updatedAt: new Date()
        }
      });

    } catch (err) {
      console.error("Database error:", err);
    }

    revalidatePath(`/products/${slugify(name)}`);
    revalidatePath('/')
  
    return NextResponse.json("success");
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

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
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
