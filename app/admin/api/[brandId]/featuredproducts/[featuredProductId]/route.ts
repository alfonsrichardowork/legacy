import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/app/admin/actions';
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, featuredProductId: string }> }
) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        brandId: params.brandId,
        isFeatured: true,
        isArchived: false,
        id: params.featuredProductId
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[SINGLE_FEATURED_PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ featuredProductId: string, brandId: string }> }
) {
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

    const { featured_img_url, isFeatured, featuredDesc } = body;

    if (!params.featuredProductId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    



    const oldImage = await prismadb.product.findFirst({
      where: {
        id: params.featuredProductId
      },
      select: {
        featured_img_url: true
      }
    })

    if(oldImage){
      if(!isFeatured){
        const featuredImgPath = path.join(process.cwd(), oldImage.featured_img_url);
        try {
          await fs.unlink(featuredImgPath);
        } catch (error) {
          console.warn(`Could not delete file ${oldImage.featured_img_url}:`, error);
        }
        await prismadb.product.update({
          where: {
            id: params.featuredProductId
          },
          data: {
            isFeatured,
            featured_img_url: '',
            featuredDesc: '',
            updatedAt: new Date(),
            updatedBy: session.name,
          },
        })
      }
      else{
        if(oldImage.featured_img_url === featured_img_url){
          await prismadb.product.update({
            where: {
              id: params.featuredProductId
            },
            data: {
              isFeatured,
              featuredDesc,
              updatedAt: new Date(),
              updatedBy: session.name,
            },
          })
        }
        else{
          const featuredImgPath = path.join(process.cwd(), oldImage.featured_img_url);
          try {
            await fs.unlink(featuredImgPath);
          } catch (error) {
            console.warn(`Could not delete file ${oldImage.featured_img_url}:`, error);
          }
          await prismadb.product.update({
            where: {
              id: params.featuredProductId
            },
            data: {
              isFeatured,
              featured_img_url,
              featuredDesc,
              updatedAt: new Date(),
              updatedBy: session.name,
            },
          })
        }
      }
    }
    revalidatePath(`/`)
    return NextResponse.json("success");
  } catch (error) {
    console.log('[FEATURED_PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
  