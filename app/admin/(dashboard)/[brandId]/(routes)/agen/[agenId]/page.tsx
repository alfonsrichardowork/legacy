import prismadb from "@/lib/prismadb";
import { AgenForm } from "./components/agen-form";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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

