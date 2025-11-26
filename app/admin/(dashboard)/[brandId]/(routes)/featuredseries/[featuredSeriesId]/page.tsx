import prismadb from "@/lib/prismadb";
import { FeaturedSeriesForm } from "./components/featured-series-form";

const FeaturedSeriesPage = async (
  props: {
    params: Promise<{ featuredSeriesId: string }>
  }
) => {
  const params = await props.params;
  const onefeaturedseries = await prismadb.featuredseries.findUnique({
    where: {
      id: params.featuredSeriesId,
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FeaturedSeriesForm 
          initialData={onefeaturedseries}
        />
      </div>
    </div>
  );
}

export default FeaturedSeriesPage;

