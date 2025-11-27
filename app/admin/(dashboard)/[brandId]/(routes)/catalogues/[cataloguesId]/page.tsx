import prismadb from "@/lib/prismadb";
import { CataloguesForm } from "./components/catalogues-form";

const CataloguesPage = async (
  props: {
    params: Promise<{ cataloguesId: string }>
  }
) => {
  const params = await props.params;
  const onecatalogue = await prismadb.catalogues.findUnique({
    where: {
      id: params.cataloguesId,
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CataloguesForm
          initialData={onecatalogue}
        />
      </div>
    </div>
  );
}

export default CataloguesPage;

