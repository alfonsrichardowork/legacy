import prismadb from "@/lib/prismadb";
import { DistributorForm } from "./components/distributor-form";

const DistributorPage = async (
  props: {
    params: Promise<{ distributorId: string }>
  }
) => {
  const params = await props.params;
  const oneDistributor = await prismadb.distributors.findUnique({
    where: {
      id: params.distributorId,
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DistributorForm 
          initialData={oneDistributor}
        />
      </div>
    </div>
  );
}

export default DistributorPage;

