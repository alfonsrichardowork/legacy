import getSubCatNameBySlug from "@/app/(legacy)/actions/get-SubCat_Name"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ driversSubCategory: string }>
}
 
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const subCatName = await getSubCatNameBySlug(params.driversSubCategory)
  const previousImages = (await parent).openGraph?.images || []
  const logo_URL = subCatName.name.toLowerCase() === 'legacy' ? 'https://legacy.us.com/images/legacy/logo_legacy.webp' : subCatName.name.toLowerCase() === 'prestige' ? 'https://legacy.us.com/images/legacy/prestige_logo.webp' : subCatName.name.toLowerCase() === 'energy' ? 'https://legacy.us.com/images/legacy/energy_logo.webp' : subCatName.name.toLowerCase() === 'sparta' ? 'https://legacy.us.com/images/legacy/sparta_logo.webp' : 'https://legacy.us.com/images/legacy/logo_legacy.webp'
  return {
    title: subCatName.name.concat(" Series | Legacy Speaker"),
    description: "Semua Seri ".concat(subCatName.name, " milik Legacy Speaker"),
    applicationName: 'Legacy Speaker',
    keywords: ["Legacy Speaker", subCatName.name.concat(" Series"), subCatName.name.concat(" Series by Legacy Speaker"), "Seri ".concat(subCatName.name, " milik Legacy Speaker")],
    openGraph: {
      title: `${subCatName.name} Series | Legacy Speaker`,
      description: "Semua Seri ".concat(subCatName.name, " milik Legacy Speaker"),
      url: `https://legacy.us.com/drivers/${subCatName.name.toLowerCase()}`,
      siteName: "Legacy Speaker",
      images: [
        {
          url: logo_URL,
          width: 800,
          height: 800,
          alt: subCatName.name.concat(" Series"),
        },
        ...previousImages,
      ],
      locale: 'id_ID',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${subCatName.name} Series | Legacy Speaker`,
      description: "Semua Seri ".concat(subCatName.name, " milik Legacy Speaker"),
      images: [
        {
          url: logo_URL,
          width: 800,
          height: 800,
          alt: subCatName.name.concat(" Series"),
        },
      ],
    },
  }
}

export default function ProductBySubCategoryLayout({
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