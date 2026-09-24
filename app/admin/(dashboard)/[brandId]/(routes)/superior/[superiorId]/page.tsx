import prismadb from "@/lib/prismadb";
import { SuperiorForm } from "./components/superior-form";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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

