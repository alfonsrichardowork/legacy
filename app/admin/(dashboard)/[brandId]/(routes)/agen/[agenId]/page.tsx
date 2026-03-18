import prismadb from "@/lib/prismadb";
import { AgenForm } from "./components/agen-form";

const AgenPage = async (
  props: {
    params: Promise<{ agenId: string }>
  }
) => {
  const params = await props.params;
  const oneAgen = await prismadb.agen.findUnique({
    where: {
      id: params.agenId,
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AgenForm 
          initialData={oneAgen}
        />
      </div>
    </div>
  );
}

export default AgenPage;

