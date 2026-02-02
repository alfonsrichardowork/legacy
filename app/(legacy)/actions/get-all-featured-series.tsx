import { featuredseries } from "@prisma/client";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_FEATURED_SERIES}`;

const getAllFeaturedSeries = async (): Promise<featuredseries[]> => {
  const response = await fetch(API, {
    next: { revalidate: 30 }
  });
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch featured products');
  }
  const data : featuredseries[] = await response.json();
  if (!data) {
    redirect('/not-found');
  }

  return data;
};

export default getAllFeaturedSeries;

