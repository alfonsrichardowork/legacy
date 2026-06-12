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
                         .replace(/[^a-z0-9]+/g, '-')
                         .replace(/(^-|-$)+/g, '') ?? '';
};

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, newsId: string }> }
) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const products = await prismadb.news.findMany({
      where: {
        brandId: params.brandId,
        id: params.newsId
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[SINGLE_NEWS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ newsId: string, brandId: string }> }
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

    const { news_img_url, news_date, title, description, link_url, link_placeholder } = body;

    if (!params.newsId) {
      return new NextResponse("News id is required", { status: 400 });
    }

    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    

    if(params.newsId != 'new'){


      //NEWS_IMAGE
      const newsImageOld = await prismadb.news.findFirst({
        where: {
          id: params.newsId,
        },
        select: {
          news_img_url: true
        }
      });

      if(newsImageOld){
        if(newsImageOld.news_img_url !== news_img_url){
          const newsImgPath = path.join(process.cwd(), newsImageOld.news_img_url);
          try {
            await fs.unlink(newsImgPath);
          } catch (error) {
            console.warn(`Could not delete file ${newsImageOld.news_img_url}:`, error);
          }
        }
      }

      await prismadb.news.update({
        where: {
          id: params.newsId,
          brandId: params.brandId
        },
        data: {
          event_date: news_date,
          title,
          news_img_url,
          link_placeholder,
          link_url,
          slug: slugify(title),
          description,
          updatedAt: new Date(),
          updatedBy: session.name,
        },
      })

    }
    else{
      await prismadb.news.create({
        data: {
          brandId: params.brandId,
          event_date: news_date,
          title,
          link_placeholder,
          news_img_url,
          link_url,
          slug: slugify(title),
          description,
          updatedAt: new Date(),
          createdAt: new Date(),
          updatedBy: session.name,
        },
      })
    }

    revalidatePath(`/`);
    revalidatePath(`/news`);
    revalidatePath(`/news/${slugify(title)}`);
    return NextResponse.json("success");
  } catch (error) {
    console.log('[NEWS_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
  

  export async function DELETE(
    req: Request,
    props: { params: Promise<{ brandId: string, newsId: string }> }
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
  
      if (!params.newsId) {
        return new NextResponse("News id is required", { status: 400 });
      }
      
      if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
        return NextResponse.json("unauthorized");
      }      
      
      //NEWS_IMAGE
      const newsImageOld = await prismadb.news.findFirst({
        where: {
          id: params.newsId,
        },
        select: {
          news_img_url: true
        }
      });

      if(newsImageOld){
        const newsImgPath = path.join(process.cwd(), newsImageOld.news_img_url);
        try {
          await fs.unlink(newsImgPath);
        } catch (error) {
          console.warn(`Could not delete file ${newsImageOld.news_img_url}:`, error);
        }
      }

      const newsDeleted = await prismadb.news.deleteMany({
        where: {
          id: params.newsId
        },
      });
  
      revalidatePath('/')
      revalidatePath('/news')
      return NextResponse.json(newsDeleted);
    } catch (error) {
      console.log('[NEWS_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  