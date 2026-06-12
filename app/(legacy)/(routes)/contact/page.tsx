import type { contacts } from "@prisma/client"
import { Suspense } from "react"
import ContactUsClient from "./pageClient"
import { Loader } from "../../components/ui/loader"
import prismadb from "@/lib/prismadb"

function formatPhoneNumbers(phone: string): string {
  return phone.split("||").join(", ")
}

export default async function ContactUsJsonLd() {
  const contacts = await prismadb.contacts.findMany({});
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? "http://localhost:3001"

  const subContacts = contacts.map((val: contacts) => ({
    "@type": "ContactPoint",
    telephone: formatPhoneNumbers(val.phone),
    contactType: val.type,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Legacy Speaker",
    url: `${baseUrl}/contact`,
    logo: `${baseUrl}/images/legacy/logo_legacy.webp`,
    description:
      "Speaker mobil asli buatan Indonesia produksi dari CV. Sinar Baja Electric. Manjakan telinga Anda dengan suara jernih dan bass kuat!",
    contactPoint: [...subContacts],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="sr-only">Contact Us | Legacy Speaker</h1>
      <div className="bg-white -z-10 h-fit w-full">
        <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><Loader/></div>}>
          <ContactUsClient contacts={contacts} />
        </Suspense>
      </div>
    </>
  )
}
