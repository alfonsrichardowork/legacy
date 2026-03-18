import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/app/admin/actions';
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

const slugify = (str: string): string => {
  const normalizedStr = str.replace(/["“”‟″‶〃״˝ʺ˶ˮײ]/g, "'");
  const strAfterQuote = normalizedStr.includes("'") ? normalizedStr.split("'")[1] : normalizedStr;
  const strBeforeSlash = strAfterQuote?.includes('/') ? strAfterQuote.split('/')[0] : strAfterQuote;
  const strWithoutSatori = strBeforeSlash?.replace(/SATORI/gi, '');
  return strWithoutSatori?.toLowerCase()
  .replace(/\+/g, 'plus')
                         .replace(/[^a-z0-9]+/g, '-')
                         .replace(/(^-|-$)+/g, '') ?? '';
};

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, agenId: string }> }
) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const agen = await prismadb.agen.findMany({
      where: {
        id: params.agenId
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(agen);
  } catch (error) {
    console.log('[SINGLE_AGEN_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ agenId: string, brandId: string }> }
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

    const { name, contactPerson, phoneNumber, email, country, state, city, joinDate, active } = body;

    if (!params.agenId) {
      return new NextResponse("Agen id is required", { status: 400 });
    }

    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    



    if(params.agenId != 'new'){
      await prismadb.agen.update({
        where: {
          id: params.agenId
        },
        data: {
          name, 
          contactPerson, 
          phoneNumber, 
          email, 
          country,
          state,
          city, 
          joinDate, 
          active,
          updatedAt: new Date(),
          updatedBy: session.name,
        },
      })

    }
    else{

      const duplicates = await prismadb.agen.findFirst({
        where:{
          name
        }
      })

      if(duplicates){
        return NextResponse.json("duplicate")
      }

      await prismadb.agen.create({
        data: {
          name,
          contactPerson, 
          phoneNumber, 
          email, 
          country, 
          state,
          city,
          joinDate, 
          active,
          updatedAt: new Date(),
          createdAt: new Date(),
          updatedBy: session.name,
        },
      })
    }

    revalidatePath('/agen')
    return NextResponse.json("success");
  } catch (error) {
    console.log('[AGEN_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
  

  export async function DELETE(
    req: Request,
    props: { params: Promise<{ brandId: string, agenId: string }> }
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
  
      if (!params.agenId) {
        return new NextResponse("Agen id is required", { status: 400 });
      }
      
      if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
        return NextResponse.json("unauthorized");
      }

      const deleted = await prismadb.agen.deleteMany({
        where: {
          id: params.agenId
        },
      });
  
      return NextResponse.json(deleted);
    } catch (error) {
      console.log('[AGEN_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  