import { AllProductsJsonType } from "@/app/(legacy)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_PRODUCTS_JSON}`;

const getAllProductsJsonld = async (): Promise<AllProductsJsonType[]> => {
  const response = await fetch(API, {
    next: { revalidate: 30 }
  });
  if (!response.ok) {
      redirect('/');
    // throw new Error(`Failed to fetch all products`);
  }
  const data = await response.json();
  if (!data) {
    redirect('/');
  }
  return data;
};

export default getAllProductsJsonld;

