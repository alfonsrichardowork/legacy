export const dynamic = "force-dynamic";
import { distributors } from "@prisma/client";
import getAllDistributor from "../../actions/get-all-distributor";
import DistributorsClient from "./pageClient";

export default async function DistributorsJsonLd() {
  const distributosData: distributors[] = await getAllDistributor();
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const subOrganizations = distributosData.map((val: distributors) => ({
    "@type": "LocalBusiness",
    "name": val.name ?? "",
    "telephone": val.phoneNumber ?? "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": JSON.parse(val.city).name ?? "",
      "addressRegion": JSON.parse(val.state).name ?? "",
      "addressCountry": JSON.parse(val.country).iso2 ?? "",
    }
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Legacy Speaker",
    "url": `${baseUrl}/distributors`,
    "logo": `${baseUrl}/images/legacy/logo_legacy.webp`,
    "description": "Find our distributors around the world.",
    "subOrganization": [
      ...subOrganizations,
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className='sr-only'>Distributors | Legacy Speaker</h1>
      <DistributorsClient distributors={distributosData}/>
    </>
  );
}