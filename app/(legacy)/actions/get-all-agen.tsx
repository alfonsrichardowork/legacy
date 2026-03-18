import { agen } from "@prisma/client";

const API = `${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_AGEN}`;

const getAllAgen = async (): Promise<agen[]> => {
  try {
    const response = await fetch(API, {
      next: { revalidate: 30 }
    });
    
    if (!response.ok) {
      console.error('Failed to fetch agen:', response.status);
      return []; // Return empty array instead of redirect
    }
    
    const data: agen[] = await response.json();
    return data || [];
    
  } catch (error) {
    console.error('Error fetching agen:', error);
    return []; // Return empty array on network errors
  }
};

export default getAllAgen;