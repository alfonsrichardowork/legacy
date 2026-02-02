import { superior } from "@prisma/client";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_SUPERIOR}`;

const getAllSuperior = async (): Promise<superior[]> => {
  const response = await fetch(API, {
    next: { revalidate: 30 }
  });
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch featured products');
  }
  const data : superior[] = await response.json();
  if (!data) {
    redirect('/not-found');
  }

  return data;
};

export default getAllSuperior;

