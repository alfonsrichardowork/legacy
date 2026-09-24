import prismadb from "@/lib/prismadb";

import { SubSubCategoryForm } from "./components/sub-sub-category-form";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const SubSubCategoryPage = async (
  props: {
    params: Promise<{ subSubCategoryId: string }>
  }
) => {
  const params = await props.params;
  const subsubcategory = await prismadb.allcategory.findUnique({
    where: {
      id: params.subSubCategoryId,
      type: "Sub Sub Category"
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubSubCategoryForm initialData={subsubcategory} />
      </div>
    </div>
  );
}

export default SubSubCategoryPage;
