import prismadb from "@/lib/prismadb";
import { SuperiorForm } from "./components/superior-form";

const SuperiorityPage = async (
  props: {
    params: Promise<{ superiorId: string }>
  }
) => {
  const params = await props.params;
  const onesuperior = await prismadb.superior.findUnique({
    where: {
      id: params.superiorId,
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SuperiorForm 
          initialData={onesuperior}
        />
      </div>
    </div>
  );
}

export default SuperiorityPage;

