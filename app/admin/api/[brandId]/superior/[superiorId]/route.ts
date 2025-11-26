import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/app/admin/actions';
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, superiorId: string }> }
) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const superior = await prismadb.superior.findMany({
      where: {
        id: params.superiorId
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(superior);
  } catch (error) {
    console.log('[SINGLE_SUPERIOR_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ superiorId: string, brandId: string }> }
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

    const { name, url } = body;

    if (!params.superiorId) {
      return new NextResponse("Superior id is required", { status: 400 });
    }

    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    



    if(params.superiorId != 'new'){
      const oldUrl = await prismadb.superior.findMany({
        where: {
          id: params.superiorId
        },
        select:{
          url: true
        }
      })
      //Delete physical files
      if(oldUrl && oldUrl.length > 0) {
        oldUrl.map( async (val) => {
          if(val.url != url) {
            const superiorImgPath = path.join(process.cwd(), val.url);
            try {
              await fs.unlink(superiorImgPath);
            } catch (error) {
              console.warn(`Could not delete file ${url}:`, error);
            }
          }
        })
      }

      await prismadb.superior.update({
        where: {
          id: params.superiorId
        },
        data: {
          name,
          url,
          updatedAt: new Date(),
          updatedBy: session.name,
        },
      })

    }
    else{

      const duplicates = await prismadb.superior.findFirst({
        where:{
          name
        }
      })

      if(duplicates){
        return NextResponse.json("duplicate")
      }

      await prismadb.superior.create({
        data: {
          name,
          url,
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
    console.log('[SUPERIOR_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
  

  export async function DELETE(
    req: Request,
    props: { params: Promise<{ brandId: string, superiorId: string }> }
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
  
      if (!params.superiorId) {
        return new NextResponse("Superior id is required", { status: 400 });
      }
      
      if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
        return NextResponse.json("unauthorized");
      }    

      const toBeDeleted = await prismadb.superior.findMany({
        where:{
          id: params.superiorId
        }
      })

      if (toBeDeleted) {
        toBeDeleted.map( async (val) => {
          const imagePath = path.join(process.cwd(), val.url);

          try {
            await fs.unlink(imagePath);
          } catch (error) {
            console.warn(`Could not delete file ${val.url}:`, error);
          }
        })
      }
        
      const deleted = await prismadb.superior.deleteMany({
        where: {
          id: params.superiorId
        },
      });
  
      return NextResponse.json(deleted);
    } catch (error) {
      console.log('[SUPERIOR_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  