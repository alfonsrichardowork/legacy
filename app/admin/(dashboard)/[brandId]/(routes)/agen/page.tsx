import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";
import { AgenClient } from "./components/client";
import { AgenColumn } from "./components/columns";

const AgenPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const allagen = await prismadb.agen.findMany({
    orderBy: {
      updatedAt: 'desc'
    }
  });

  const formattedagen: AgenColumn[] = allagen.map((item) => ({
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
        <AgenClient data={formattedagen} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default AgenPage;
