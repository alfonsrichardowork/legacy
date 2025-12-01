import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import { getSession } from "@/app/admin/actions";
import { AboutUsForm } from "./components/about-us-form";

const AboutUsPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  } 

  const brand = await prismadb.brand.findFirst({
    where: {
      id: params.brandId
    }
  });

  if (!brand) {
    redirect(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AboutUsForm initialData={brand} />
      </div>
    </div>
  );
}

export default AboutUsPage;
