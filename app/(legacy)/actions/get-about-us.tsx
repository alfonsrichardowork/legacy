import { Brand, distributors } from "@prisma/client";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ABOUT_US}`;

const getAboutUs = async (): Promise<Brand> => {
  const response = await fetch(API);
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch featured products');
  }
  const data : Brand = await response.json();
  if (!data) {
    redirect('/not-found');
  }

  return data;
};

export default getAboutUs;

