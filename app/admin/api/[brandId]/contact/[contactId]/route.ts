import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/app/admin/actions';
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, contactId: string }> }
) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const contact = await prismadb.contacts.findMany({
      where: {
        id: params.contactId
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log('[SINGLE_CONTACT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ contactId: string, brandId: string }> }
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

    const { type, locationUrl, country, state, city, address, img, phone } = body;

    if (!params.contactId) {
      return new NextResponse("Contact id is required", { status: 400 });
    }

    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    



    if(params.contactId != 'new'){
      const oldUrl = await prismadb.contacts.findMany({
        where: {
          id: params.contactId
        },
        select:{
          img: true
        }
      })

      //Delete physical files
      if(oldUrl && oldUrl.length > 0) {
        oldUrl.map( async (val) => {
          if(val.img != img) {
            const contactImgPath = path.join(process.cwd(), val.img);
            try {
              await fs.unlink(contactImgPath);
            } catch (error) {
              console.warn(`Could not delete file ${val.img}:`, error);
            }
          }
        })
      }

      await prismadb.contacts.update({
        where: {
          id: params.contactId
        },
        data: {
          type,
          locationUrl,
          country,
          state,
          city,
          address,
          img,
          phone,
          updatedAt: new Date(),
          updatedBy: session.name,
        },
      })

    }
    else{

      const duplicates = await prismadb.contacts.findFirst({
        where:{
          type
        }
      })

      if(duplicates){
        return NextResponse.json("duplicate")
      }

      await prismadb.contacts.create({
        data: {
          type,
          locationUrl,
          country,
          state,
          city,
          address,
          img,
          phone,
          updatedAt: new Date(),
          createdAt: new Date(),
          updatedBy: session.name,
        },
      })
    }

    revalidatePath('/kontak')
    revalidatePath('/en/contact')
    return NextResponse.json("success");
  } catch (error) {
    console.log('[CONTACT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
  

  export async function DELETE(
    req: Request,
    props: { params: Promise<{ brandId: string, contactId: string }> }
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
  
      if (!params.contactId) {
        return new NextResponse("Contact id is required", { status: 400 });
      }
      
      if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
        return NextResponse.json("unauthorized");
      }

      const toBeDeleted = await prismadb.contacts.findMany({
        where:{
          id: params.contactId
        }
      })

      if (toBeDeleted) {
        toBeDeleted.map( async (val) => {
          const imagePath = path.join(process.cwd(), val.img);

          try {
            await fs.unlink(imagePath);
          } catch (error) {
            console.warn(`Could not delete file ${val.img}:`, error);
          }
        })
      }

      const deleted = await prismadb.contacts.deleteMany({
        where: {
          id: params.contactId
        },
      });
  
      return NextResponse.json(deleted);
    } catch (error) {
      console.log('[CONTACT_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  