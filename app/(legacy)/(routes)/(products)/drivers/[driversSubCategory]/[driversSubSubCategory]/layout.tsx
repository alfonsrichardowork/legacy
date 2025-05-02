import getSubCatNameBySlug from "@/app/(legacy)/actions/get-SubCat_Name"
import getSubSubCatNameBySlug from "@/app/(legacy)/actions/get-SubSubCat_Name"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ driversSubCategory: string, driversSubSubCategory: string }>
}
 
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const [subCatNameResult, subSubCatNameResult] = await Promise.allSettled([
    getSubCatNameBySlug(params.driversSubCategory),
    getSubSubCatNameBySlug(params.driversSubSubCategory),
  ]);

  const subCatName = subCatNameResult.status === 'fulfilled' ? subCatNameResult.value : { name: '' };
  const subSubCatName = subSubCatNameResult.status === 'fulfilled' ? subSubCatNameResult.value : { name: '' };
    const previousImages = (await parent).openGraph?.images || []
  const logo_URL = subCatName.name.toLowerCase() === 'legacy' ? 'https://legacy.us.com/images/legacy/logo_legacy.webp' : subCatName.name.toLowerCase() === 'prestige' ? 'https://legacy.us.com/images/legacy/prestige_logo.webp' : subCatName.name.toLowerCase() === 'energy' ? 'https://legacy.us.com/images/legacy/energy_logo.webp' : subCatName.name.toLowerCase() === 'sparta' ? 'https://legacy.us.com/images/legacy/sparta_logo.webp' : 'https://legacy.us.com/images/legacy/logo_legacy.webp'

  return {
    title: subCatName.name.concat(" ", subSubCatName.name," Series | Legacy Speaker"),
    description: "Semua Seri ".concat(subCatName.name, " ", subSubCatName.name, " milik Legacy Speaker"),
    applicationName: 'Legacy Speaker',
    keywords: ["Legacy Speaker", subCatName.name.concat(" ",subSubCatName.name, " Series"), subCatName.name.concat(" ",subSubCatName.name, " Series by Legacy Speaker"), "Seri ".concat(subCatName.name, " ", subSubCatName.name, " milik Legacy Speaker")],
    openGraph: {
      title: subCatName.name.concat(" ", subSubCatName.name," Series | Legacy Speaker"),
      description: "Semua Seri ".concat(subCatName.name, " ", subSubCatName.name, " milik Legacy Speaker"),
      url: `https://legacy.us.com/drivers/${subCatName.name.toLowerCase()}/${subSubCatName.name.toLowerCase()}`,
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
          alt: subCatName.name.concat(" ", subSubCatName.name," Series"),
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
          alt: subCatName.name.concat(" ", subSubCatName.name," Series"),
        },
      ],
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