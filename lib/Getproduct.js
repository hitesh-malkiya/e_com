
import axios from 'axios';


export const getProducts = async (queryString) => {
  try {
    
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/product?${queryString}`);
    return response;
  } catch (error) {
   return {message : "error"}

  }
};


export const getProductsSort = async (queryString, sortBby, string) => {
  try {
    
    const qs = queryString ? `&${queryString}` : ''
    const encodedCategory = encodeURIComponent(sortBby)
    
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/product?${string}=${encodeURIComponent(encodedCategory)}${qs}`);

    
    return response;
  } catch (error) {
    return {message : "error"}
  }
};





