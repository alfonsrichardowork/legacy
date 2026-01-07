import { distributors } from "@prisma/client";

const API = `${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_DISTRIBUTOR}`;

const getAllDistributor = async (): Promise<distributors[]> => {
  try {
    const response = await fetch(API, {
      next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) } // Cache for 1 hour
    });
    
    if (!response.ok) {
      console.error('Failed to fetch distributors:', response.status);
      return []; // Return empty array instead of redirect
    }
    
    const data: distributors[] = await response.json();
    return data || [];
    
  } catch (error) {
    console.error('Error fetching distributors:', error);
    return []; // Return empty array on network errors
  }
};

export default getAllDistributor;



// import { distributors } from "@prisma/client";
// import { redirect } from "next/navigation";

// const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_DISTRIBUTOR}`;

// const getAllDistributor = async (): Promise<distributors[]> => {
//   const response = await fetch(API);
//   if (!response.ok) {
//     redirect('/');
//     // throw new Error('Failed to fetch featured products');
//   }
//   const data : distributors[] = await response.json();
//   if (!data) {
//     redirect('/not-found');
//   }

//   return data;
// };

// export default getAllDistributor;




