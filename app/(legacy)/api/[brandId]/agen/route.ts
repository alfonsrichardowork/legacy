import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const agen = await prismadb.agen.findMany({});

    return NextResponse.json(agen);
  } catch (error) {
    console.log('[AGEN_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
