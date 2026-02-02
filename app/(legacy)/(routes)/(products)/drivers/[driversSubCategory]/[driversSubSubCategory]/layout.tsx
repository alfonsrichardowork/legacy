import getSubCatNameBySlug from "@/app/(legacy)/actions/get-SubCat_Name"
import getSubSubCatNameBySlug from "@/app/(legacy)/actions/get-SubSubCat_Name"
import { allDriversSubSubCat } from "@/lib/gsp_var";
import { Metadata, ResolvingMetadata } from "next"

// export const revalidate = 86400
// export async function generateStaticParams() {
//   return allDriversSubSubCat.map(([driversSubCategory, driversSubSubCategory]) => ({
//     driversSubCategory,
//     driversSubSubCategory,
//   }));
// }

type Props = {
  params: Promise<{ driversSubCategory: string, driversSubSubCategory: string }>
}
 
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const [subCatNameResult, subSubCatNameResult] = await Promise.allSettled([
    getSubCatNameBySlug(params.driversSubCategory),
    getSubSubCatNameBySlug(params.driversSubSubCategory),
  ]);

  const subCatName = subCatNameResult.status === 'fulfilled' ? subCatNameResult.value : { name: '' };
  const subSubCatName = subSubCatNameResult.status === 'fulfilled' ? subSubCatNameResult.value : { name: '' };
    const previousImages = (await parent).openGraph?.images || []
  const logo_URL = subCatName.name.toLowerCase() === 'legacy' ? `${baseUrl}/images/legacy/logo_legacy.webp` : subCatName.name.toLowerCase() === 'prestige' ? `${baseUrl}/images/legacy/prestige_logo.webp` : subCatName.name.toLowerCase() === 'energy' ? `${baseUrl}/images/legacy/energy_logo.webp` : subCatName.name.toLowerCase() === 'sparta' ? `${baseUrl}/images/legacy/sparta_logo.webp` : `${baseUrl}/images/legacy/logo_legacy.webp`
  const logo_ALT = subCatName.name.toLowerCase() === 'legacy' ? `Legacy Speaker Logo` : subCatName.name.toLowerCase() === 'prestige' ? `Prestige Series Logo` : subCatName.name.toLowerCase() === 'energy' ? `Energy Series Logo` : subCatName.name.toLowerCase() === 'sparta' ? `Sparta Series Logo` : `Legacy Speaker Logo`
  return {
    title: subCatName.name.concat(" ", subSubCatName.name," Series | Legacy Speaker"),
    description: "Semua Seri ".concat(subCatName.name, " ", subSubCatName.name, " milik Legacy Speaker"),
    applicationName: 'Legacy Speaker',
    keywords: ["Legacy Speaker", subCatName.name.concat(" ",subSubCatName.name, " Series"), subCatName.name.concat(" ",subSubCatName.name, " Series by Legacy Speaker"), "Seri ".concat(subCatName.name, " ", subSubCatName.name, " milik Legacy Speaker")],
    openGraph: {
      title: subCatName.name.concat(" ", subSubCatName.name," Series | Legacy Speaker"),
      description: "Semua Seri ".concat(subCatName.name, " ", subSubCatName.name, " milik Legacy Speaker"),
      url: `${baseUrl}/drivers/${subCatName.name.toLowerCase()}/${subSubCatName.name.toLowerCase()}`,
      siteName: "Legacy Speaker",
      images: [
        // {
        //   url: logo_URL,
        //   width: 1200,
        //   height: 630,
        //   alt: subCatName.name.concat(" ", subSubCatName.name," Series"),
        // },
        {
          url: logo_URL,
          width: 800,
          height: 800,
          alt: logo_ALT,
        },
        ...previousImages,
      ],
      locale: 'id_ID',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: subCatName.name.concat(" ", subSubCatName.name," Series | Legacy Speaker"),
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
  }
}

export default function ProductBySubSubCategoryLayout({
    children,
  }: {
    children: React.ReactNode
  }
)
{
  return(
    <>
      {children}
    </>
  )
  }