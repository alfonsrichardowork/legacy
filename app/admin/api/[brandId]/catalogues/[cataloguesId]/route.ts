import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/app/admin/actions';
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, cataloguesId: string }> }
) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const catalogue = await prismadb.catalogues.findMany({
      where: {
        id: params.cataloguesId
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(catalogue);
  } catch (error) {
    console.log('[SINGLE_CATALOGUE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ cataloguesId: string, brandId: string }> }
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

    const { name, pdf, publicationDate } = body;

    if (!params.cataloguesId) {
      return new NextResponse("Catalogues id is required", { status: 400 });
    }

    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    



    if(params.cataloguesId != 'new'){
      const oldUrl = await prismadb.catalogues.findMany({
        where: {
          id: params.cataloguesId
        },
        select:{
          pdf: true
        }
      })
      //Delete physical files
      if(oldUrl && oldUrl.length > 0) {
        oldUrl.map( async (val) => {
          if(val.pdf != pdf) {
            const pdfPath = path.join(process.cwd(), val.pdf);
            try {
              await fs.unlink(pdfPath);
            } catch (error) {
              console.warn(`Could not delete file ${val.pdf}:`, error);
            }
          }
        })
      }

      await prismadb.catalogues.update({
        where: {
          id: params.cataloguesId
        },
        data: {
          name, 
          pdf,
          publicationDate,
          updatedAt: new Date(),
          updatedBy: session.name,
        },
      })

    }
    else{

      const duplicates = await prismadb.catalogues.findFirst({
        where:{
          name
        }
      })

      if(duplicates){
        return NextResponse.json("duplicate")
      }

      await prismadb.catalogues.create({
        data: {
          name, 
          pdf,
          publicationDate,
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
    console.log('[CATALOGUES_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
  

  export async function DELETE(
    req: Request,
    props: { params: Promise<{ brandId: string, cataloguesId: string }> }
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
  
      if (!params.cataloguesId) {
        return new NextResponse("Catalogues id is required", { status: 400 });
      }
      
      if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
        return NextResponse.json("unauthorized");
      }    

      const toBeDeleted = await prismadb.catalogues.findMany({
        where:{
          id: params.cataloguesId
        }
      })

      if (toBeDeleted) {
        toBeDeleted.map( async (val) => {
          const pdfPath = path.join(process.cwd(), val.pdf);

          try {
            await fs.unlink(pdfPath);
          } catch (error) {
            console.warn(`Could not delete file ${val.pdf}:`, error);
          }
        })
      }
        
      const deleted = await prismadb.catalogues.deleteMany({
        where: {
          id: params.cataloguesId
        },
      });
  
      return NextResponse.json(deleted);
    } catch (error) {
      console.log('[CATALOGUES_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  