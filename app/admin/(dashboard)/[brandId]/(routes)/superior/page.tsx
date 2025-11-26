import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";
import { SuperiorityClient } from "./components/client";
import { SuperiorityColumn } from "./components/columns";

const SuperiorityPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const allsuperiority = await prismadb.superior.findMany({
    orderBy: {
      updatedAt: 'desc'
    }
  });

  const formattedSuperior: SuperiorityColumn[] = allsuperiority.map((item) => ({
    id: item.id,
    name: item.name,
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
    updatedBy: item.updatedBy
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SuperiorityClient data={formattedSuperior} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default SuperiorityPage;
