export const dynamic = "force-dynamic";
import Link from "next/link";
import { Separator } from "../../../../components/ui/separator";
import { FileDown } from "lucide-react";
import { catalogues } from "@prisma/client";
import getAllCatalogues from "../../actions/get-all-catalogues";
import CatalogClient from "./pageClient";

export default async function CatalogJsonLd() {
  const catalogData: catalogues[] = await getAllCatalogues();
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Catalog | Legacy Speaker",
    "url": `${baseUrl}/catalog`,
    "logo": `${baseUrl}/images/legacy/logo_legacy.webp`,
    "description": "Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!",
  };

  return (
    <div className="bg-white -z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CatalogClient catalog={catalogData} />
    </div>
  );
}