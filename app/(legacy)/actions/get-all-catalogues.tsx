import { catalogues } from "@prisma/client";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_CATALOGUES}`;

const getAllCatalogues = async (): Promise<catalogues[]> => {
  const response = await fetch(API, {
    next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) } // Cache for 1 hour
  });
  if (!response.ok) {
    redirect('/');
  }
  const data : catalogues[] = await response.json();
  if (!data) {
    redirect('/not-found');
  }

  return data;
};

export default getAllCatalogues;

