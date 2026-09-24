import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/app/admin/actions';
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { uploadsprefix } from '@/lib/uploads-prefix';

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, featuredSeriesId: string }> }
) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const featured = await prismadb.featuredseries.findMany({
      where: {
        id: params.featuredSeriesId
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(featured);
  } catch (error) {
    console.log('[SINGLE_FEATURED_SERIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ featuredSeriesId: string, brandId: string }> }
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

    const { name, href, img, alt, desc } = body;

    if (!params.featuredSeriesId) {
      return new NextResponse("Featured Series id is required", { status: 400 });
    }

    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    



    if(params.featuredSeriesId != 'new'){
      const oldUrl = await prismadb.featuredseries.findMany({
        where: {
          id: params.featuredSeriesId
        },
        select:{
          img: true
        }
      })
      //Delete physical files
      if(oldUrl && oldUrl.length > 0) {
        oldUrl.map( async (val) => {
          if(val.img != img) {
            if(val.img.startsWith(uploadsprefix)){
              const filename = val.img.slice(uploadsprefix.length)
              // if (filename && path.basename(filename) === filename) {
                const imgPath = path.join(process.cwd(), 'uploads', filename);
                try {
                  await fs.unlink(imgPath);
                } catch (error) {
                  console.warn(`Could not delete file ${val.img}:`, error);
                } 
              // }
            }
            else{
              console.warn(`Not inside uploads folder`);
            }
          }
        })
      }

      await prismadb.featuredseries.update({
        where: {
          id: params.featuredSeriesId
        },
        data: {
          name, 
          href, 
          img, 
          alt, 
          desc,
          updatedAt: new Date(),
          updatedBy: session.name,
        },
      })

    }
    else{

      const duplicates = await prismadb.featuredseries.findFirst({
        where:{
          name
        }
      })

      if(duplicates){
        return NextResponse.json("duplicate")
      }

      await prismadb.featuredseries.create({
        data: {
          name, 
          href, 
          img, 
          alt, 
          desc,
          updatedAt: new Date(),
          createdAt: new Date(),
          updatedBy: session.name,
        },
      })
    }

    revalidatePath('')
    revalidatePath('/en')
    return NextResponse.json("success");
  } catch (error) {
    console.log('[FEATURED_SERIES_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
  

  export async function DELETE(
    req: Request,
    props: { params: Promise<{ brandId: string, featuredSeriesId: string }> }
  ) {
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
  
      if (!params.featuredSeriesId) {
        return new NextResponse("Featured Series id is required", { status: 400 });
      }
      
      if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
        return NextResponse.json("unauthorized");
      }    

      const toBeDeleted = await prismadb.featuredseries.findMany({
        where:{
          id: params.featuredSeriesId
        }
      })

      if (toBeDeleted) {
        toBeDeleted.map( async (val) => {
          if(val.img.startsWith(uploadsprefix)){
            const filename = val.img.slice(uploadsprefix.length)
            // if (filename && path.basename(filename) === filename) {
              const imgPath = path.join(process.cwd(), 'uploads', filename);
              try {
                await fs.unlink(imgPath);
              } catch (error) {
                console.warn(`Could not delete file ${val.img}:`, error);
              } 
            // }
          }
          else{
            console.warn(`Not inside uploads folder`);
          }
        })
      }
        
      const deleted = await prismadb.featuredseries.deleteMany({
        where: {
          id: params.featuredSeriesId
        },
      });
  
      return NextResponse.json(deleted);
    } catch (error) {
      console.log('[FEATURED_SERIES_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  