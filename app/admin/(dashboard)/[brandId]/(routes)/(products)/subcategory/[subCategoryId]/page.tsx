import prismadb from "@/lib/prismadb";

import { SubCategoryForm } from "./components/sub-category-form";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const SubCategoryPage = async (
  props: {
    params: Promise<{ subCategoryId: string }>
  }
) => {
  const params = await props.params;
  const Subcategory = await prismadb.allcategory.findUnique({
    where: {
      id: params.subCategoryId,
      type: "Sub Category"
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoryForm initialData={Subcategory} />
      </div>
    </div>
  );
}

export default SubCategoryPage;
