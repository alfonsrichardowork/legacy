import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";
import { CataloguesColumn } from "./components/columns";
import { CataloguesClient } from "./components/client";

const CataloguesPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const allcatalogues = await prismadb.catalogues.findMany({
    orderBy: {
      updatedAt: 'desc'
    }
  });

  const formattedCatalogues: CataloguesColumn[] = allcatalogues.map((item) => ({
    id: item.id,
    name: item.name,
    publicationDate: format(item.publicationDate, 'MMMM do, yyyy'),
    updatedBy: item.updatedBy
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CataloguesClient data={formattedCatalogues} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default CataloguesPage;
