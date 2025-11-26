export const dynamic = "force-dynamic";
import { Brand } from "@prisma/client";
import getAboutUs from "../../actions/get-about-us";
import AboutUsClient from "./pageClient";

export default async function AboutUsJsonLd() {
  const distributorsData: Brand = await getAboutUs();
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "About Us | Legacy Speaker",
    "url": `${baseUrl}/about-us`,
    "logo": `${baseUrl}/images/legacy/logo_legacy.webp`,
    "description": "Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {distributorsData && <AboutUsClient about={distributorsData}/> }
    </>
  );
}