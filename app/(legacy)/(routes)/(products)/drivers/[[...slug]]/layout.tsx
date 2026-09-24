import prismadb from "@/lib/prismadb";
import { Metadata } from "next";
import { cacheLife } from "next/cache";

async function getData(subslug: string, subsubslug: string) {
  'use cache'
  cacheLife('minutes')
  const [subCatNameResult, subSubCatNameResult] = await Promise.allSettled([
    await prismadb.allcategory.findFirst({
      where: {
        slug: subslug,
        type: "Sub Category"
      },
      select:{
        name: true,
        description: true
      }
    }),
    await prismadb.allcategory.findFirst({
      where: {
        slug: subsubslug ?? '',
        type: "Sub Sub Category"
      },
      select:{
        name: true,
        description: true
      }
    })
  ]);
  return [subCatNameResult, subSubCatNameResult] as const;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? "http://localhost:3001";

  const subslug = slug[0] || null;
  const subsubslug = slug[1] || null;

  if (!subslug) {
    return {
      title: 'All Drivers',
      description: 'Jelajahi berbagai driver speaker Legacy Speaker, dari tweeter hingga subwoofer, dengan kualitas terbaik untuk kebutuhan audio Anda!',  
      keywords: 'Drivers, Semua drivers, All Drivers, Semua drivers legacy speaker, All legacy speaker drivers',
      openGraph: {
        title: 'All Drivers | Legacy Speaker',
        description: 'Jelajahi berbagai driver speaker Legacy Speaker, dari tweeter hingga subwoofer, dengan kualitas terbaik untuk kebutuhan audio Anda!',
        url: `${baseUrl}/drivers`,
        siteName: 'Legacy Speaker',
        images: [
          {
            url: `${baseUrl}/images/legacy/logo_legacy.webp`,
            width: 800,
            height: 800,
            alt: 'Legacy Speaker Logo',
          },
        ],
        locale: 'id_ID',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'All Drivers | Legacy Speaker',
        description: 'Jelajahi berbagai driver speaker Legacy Speaker, dari tweeter hingga subwoofer, dengan kualitas terbaik untuk kebutuhan audio Anda!',
        images: [
          {
            url: `${baseUrl}/images/legacy/logo_legacy.webp`,
            width: 800,
            height: 800,
            alt: 'Legacy Speaker Logo',
          }
        ],
      },
      alternates: {
        canonical: `${baseUrl}/drivers`,
      },
    };
  }

  const [subCatNameResult, subSubCatNameResult] = await getData(subslug, subsubslug ?? '');

  const subCatName = subCatNameResult.status === 'fulfilled' && subCatNameResult.value ? subCatNameResult.value : { name: '', description: '' };
  const subSubCatName = subSubCatNameResult.status === 'fulfilled' && subSubCatNameResult.value ? subSubCatNameResult.value : { name: '', description: '' };

  const logo_URL = (subCatName?.name ?? '').toLowerCase() === 'legacy' ? `${baseUrl}/images/legacy/logo_legacy.webp` : (subCatName?.name ?? '').toLowerCase() === 'prestige' ? `${baseUrl}/images/legacy/prestige_logo.webp` : (subCatName?.name ?? '').toLowerCase() === 'energy' ? `${baseUrl}/images/legacy/energy_logo.webp` : (subCatName?.name ?? '').toLowerCase() === 'sparta' ? `${baseUrl}/images/legacy/sparta_logo.webp` : `${baseUrl}/images/legacy/logo_legacy.webp`
  const logo_ALT = subCatName.name.toLowerCase() === 'legacy' ? `Legacy Speaker Logo` : subCatName.name.toLowerCase() === 'prestige' ? `Prestige Series Logo` : subCatName.name.toLowerCase() === 'energy' ? `Energy Series Logo` : subCatName.name.toLowerCase() === 'sparta' ? `Sparta Series Logo` : `Legacy Speaker Logo`

  if(subslug && !subsubslug){
    return {
      title: subCatName.name.concat(" Series"),
      description: "Semua Seri ".concat(subCatName.name, " milik Legacy Speaker"),
      applicationName: 'Legacy Speaker',
      keywords: ["Legacy Speaker", subCatName.name.concat(" Series"), subCatName.name.concat(" Series by Legacy Speaker"), "Seri ".concat(subCatName.name, " milik Legacy Speaker")],
      openGraph: {
        title: `${subCatName.name} Series`,
        description: "Semua Seri ".concat(subCatName.name, " milik Legacy Speaker"),
        url: `${baseUrl}/drivers/${subCatName.name.toLowerCase()}`,
        siteName: "Legacy Speaker",
        images: [
          {
            url: logo_URL,
            width: 800,
            height: 800,
            alt: logo_ALT,
          },
        ],
        locale: 'id_ID',
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${subCatName.name} Series`,
        description: "Semua Seri ".concat(subCatName.name, " milik Legacy Speaker"),
        images: [
          {
            url: logo_URL,
            width: 800,
            height: 800,
            alt: logo_ALT,
          },
        ],
      },
      alternates: {
        canonical: `${baseUrl}/drivers/${subCatName.name.toLowerCase()}`,
      },
    }
  }
  else{
    return {
      title: subCatName.name.concat(" ", subSubCatName.name," Series"),
      description: "Semua Seri ".concat(subCatName.name, " ", subSubCatName.name, " milik Legacy Speaker"),
      applicationName: 'Legacy Speaker',
      keywords: ["Legacy Speaker", subCatName.name.concat(" ",subSubCatName.name, " Series"), subCatName.name.concat(" ",subSubCatName.name, " Series by Legacy Speaker"), "Seri ".concat(subCatName.name, " ", subSubCatName.name, " milik Legacy Speaker")],
      openGraph: {
        title: subCatName.name.concat(" ", subSubCatName.name," Series"),
        description: "Semua Seri ".concat(subCatName.name, " ", subSubCatName.name, " milik Legacy Speaker"),
        url: `${baseUrl}/drivers/${subCatName.name.toLowerCase()}/${subSubCatName.name.toLowerCase()}`,
        siteName: "Legacy Speaker",
        images: [
          {
            url: logo_URL,
            width: 800,
            height: 800,
            alt: logo_ALT,
          },
        ],
        locale: 'id_ID',
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: subCatName.name.concat(" ", subSubCatName.name," Series"),
        description: "Semua Seri ".concat(subCatName.name, " ", subSubCatName.name, " milik Legacy Speaker"),
        images: [
          {
            url: logo_URL,
            width: 800,
            height: 800,
            alt: logo_ALT,
          },
        ],
      },
      alternates: {
        canonical: `${baseUrl}/drivers/${subCatName.name.toLowerCase()}/${subSubCatName.name.toLowerCase()}`,
      },
    };
  }
}

export default function DriversLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto xl:px-36 lg:px-20 px-10">
      {children}
    </div>
  );
}
