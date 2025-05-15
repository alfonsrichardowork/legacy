import Link from "next/link";
import { Separator } from "../../../../components/ui/separator";
import { FileDown } from "lucide-react";

export default function Catalog() {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
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
    <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit">
      <div className='pb-8'>
        <div className='text-4xl font-bold text-black pb-4'>
          Catalogue
        </div>
        <Separator className='bg-foreground w-56 h-2'/>
      </div>
      <div>
            <Link href={'/images/legacy/legacy_brosur.pdf'} target="_blank">  
                <div className="w-full bg-blue-500 text-white flex justify-center items-center py-2 rounded-lg hover:bg-foreground transition-all ease-in-out duration-200">
                    <FileDown size={20} />   
                    <div>Download Catalogues</div>
                </div>   
            </Link>
            <div className="w-full h-screen pt-8">
                <iframe
                    src={'/images/legacy/legacy_brosur.pdf'}
                    style={{ width: '100%', height: '100%' }}
                    frameBorder="0"
                />
            </div>
      </div>
    </div>
    </div>
  );
}