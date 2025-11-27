import Link from "next/link";
import { Separator } from "../../../../components/ui/separator";
import { FileDown } from "lucide-react";
import { catalogues } from "@prisma/client";

type Props = {
  catalog: catalogues[]
};

export default function CatalogClient({ catalog }: Props) {
  return (
    <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit">
      <div className='pb-8'>
        <h1 className='text-4xl font-bold text-black pb-4'>
          Catalogue
        </h1>
        <Separator className='bg-foreground w-56 h-2'/>
      </div>
      {catalog && catalog.length > 0 && catalog.map((val: catalogues, idx) =>
        <div className="py-2" key={idx}>
          <h2 className="text-2xl font-bold text-black pb-1">{val.name}</h2>
              <h3 className="text-sm font-light text-black pb-4">
                Tanggal Publikasi: {new Date(val.publicationDate).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </h3>
          <Link href={val.pdf.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${val.pdf}` : val.pdf} target="_blank">  
            <div className="w-full bg-blue-500 text-white flex justify-center items-center py-2 rounded-lg hover:bg-foreground transition-all ease-in-out duration-200">
              <FileDown size={20} />   
              <h2>Download Catalogues</h2>
            </div>   
          </Link>
          <div className="w-full h-screen pt-8">
              <iframe
                  src={val.pdf.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${val.pdf}` : val.pdf}
                  style={{ width: '100%', height: '100%' }}
                  frameBorder="0"
              />
          </div>
          <Separator className='bg-background w-full h-1 mt-8'/>
        </div>
      )}
    </div>
  );
}