import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const about = await prismadb.brand.findFirst({
      where: {
        id: params.brandId
      }
    });

    if(!about){ return NextResponse.json(null) }

    return NextResponse.json(about);
  } catch (error) {
    console.log('[ABOUT_US_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
