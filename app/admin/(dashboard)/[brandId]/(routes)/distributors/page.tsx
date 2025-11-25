import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";
import { DistributorClient } from "./components/client";
import { DistributorColumn } from "./components/columns";

const DistributorPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const alldistributor = await prismadb.distributors.findMany({
    orderBy: {
      updatedAt: 'desc'
    }
  });

  const formattedDistributor: DistributorColumn[] = alldistributor.map((item) => ({
    id: item.id,
    name: item.name,
    phoneNumber: item.phoneNumber,
    country: (() => {
      try {
        const parsed = JSON.parse(item.country);
        return parsed?.name ?? '';
      } catch {
        return item.country ?? '';
      }
    })(),
    state: (() => {
      try {
        const parsed = JSON.parse(item.state);
        return parsed?.name ?? '';
      } catch {
        return item.state ?? '';
      }
    })(),
    city: (() => {
      try {
        const parsed = JSON.parse(item.city);
        return parsed?.name ?? '';
      } catch {
        return item.city ?? '';
      }
    })(),
  }));


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DistributorClient data={formattedDistributor} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default DistributorPage;
