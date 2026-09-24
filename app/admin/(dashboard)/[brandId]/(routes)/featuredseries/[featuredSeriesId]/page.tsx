import prismadb from "@/lib/prismadb";
import { FeaturedSeriesForm } from "./components/featured-series-form";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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

