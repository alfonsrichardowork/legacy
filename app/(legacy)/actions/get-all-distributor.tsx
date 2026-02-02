import { distributors } from "@prisma/client";

const API = `${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_DISTRIBUTOR}`;

const getAllDistributor = async (): Promise<distributors[]> => {
  try {
    const response = await fetch(API, {
      next: { revalidate: 30 }
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