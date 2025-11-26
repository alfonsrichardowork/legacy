import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";
import { FeaturedSeriesClient } from "./components/client";
import { FeaturedSeriesColumn } from "./components/columns";

const FeaturedSeriesPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const allfeaturedseries = await prismadb.featuredseries.findMany({
    orderBy: {
      updatedAt: 'desc'
    }
  });

  const formattedFeaturedSeries: FeaturedSeriesColumn[] = allfeaturedseries.map((item) => ({
    id: item.id,
    name: item.name,
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
    updatedBy: item.updatedBy
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FeaturedSeriesClient data={formattedFeaturedSeries} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default FeaturedSeriesPage;
