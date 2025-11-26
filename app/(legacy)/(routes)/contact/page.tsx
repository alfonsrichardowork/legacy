export const dynamic = "force-dynamic";
import { contacts } from "@prisma/client";
import getAllContact from "../../actions/get-all-contact";
import ContactUsClient from "./pageClient";

export default async function ContactUsJsonLd() {
  const contactData: contacts[] = await getAllContact();
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3001';
  const subContacts = contactData.map((val: contacts) => ({
    "@type": "ContactPoint",
    "telephone": val.phone.split('||').length > 0 ? val.phone.split('||').join(', ') : val.phone,
    "contactType": val.type
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Legacy Speaker",
    "url": `${baseUrl}/contact`,
    "logo": `${baseUrl}/images/legacy/logo_legacy.webp`,
    "description": "Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!",
    "contactPoint": [
      ...subContacts,
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className='sr-only'>Contact Us | Legacy Speaker</h1>
      <ContactUsClient contacts={contactData}/>
    </>
  );
}