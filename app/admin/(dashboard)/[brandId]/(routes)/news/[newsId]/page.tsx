import prismadb from "@/lib/prismadb";
import { NewsForm } from "./components/news-form";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const NewsPage = async (
  props: {
    params: Promise<{ newsId: string }>
  }
) => {
  const params = await props.params;
  const onenews = await prismadb.news.findUnique({
    where: {
      id: params.newsId,
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewsForm 
          initialData={onenews}
        />
      </div>
    </div>
  );
}

export default NewsPage;

