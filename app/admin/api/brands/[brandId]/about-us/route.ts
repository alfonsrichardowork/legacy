import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/app/admin/actions";
import { revalidatePath } from "next/cache";
import path from 'path';
import fs from 'fs/promises';


export async function PATCH(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {
    const session = await getSession();

    if(!session.isLoggedIn){
      return NextResponse.json("expired_session")
    }

    if(!(await checkBearerAPI(session))){
      session.destroy();
      return NextResponse.json("invalid_token")
    }
    
    if(!session.isAdmin){
      return NextResponse.json("not_admin")
    }

    const body = await req.json();

    const { img, title, desc, imgHomePage, descHomePage } = body;

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    if (!session.isLoggedIn) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const oldUrl = await prismadb.brand.findMany({
        where: {
          id: params.brandId
        },
        select:{
          img: true,
          imgHomePage: true
        }
      })

      //Delete physical files
      if(oldUrl && oldUrl.length > 0) {
        oldUrl.map( async (val) => {
          if(val.img != img) {
            const ImgPath = path.join(process.cwd(), val.img);
            try {
              await fs.unlink(ImgPath);
            } catch (error) {
              console.warn(`Could not delete file ${val.img}:`, error);
            }
          }
          if(val.imgHomePage != imgHomePage) {
            const ImgPath = path.join(process.cwd(), val.imgHomePage);
            try {
              await fs.unlink(ImgPath);
            } catch (error) {
              console.warn(`Could not delete file ${val.imgHomePage}:`, error);
            }
          }
        })
      }
    
    const brand = await prismadb.brand.updateMany({
      where: {
        id: params.brandId,
        userId: session.userId,
      },
      data: {
        img,
        title,
        desc,
        imgHomePage,
        descHomePage
      }
    });
  
    revalidatePath('/en/about-us')
    revalidatePath('/tentang-kami')

    return NextResponse.json(brand);
  } catch (error) {
    console.log('[ABOUT_US_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};