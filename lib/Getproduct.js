
import axios from 'axios';


const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXTAUTH_URL ;
};

export const getProducts = async (queryString) => {
  try {
    const response = await axios.get(`${getBaseUrl()}/api/product?${queryString}`);
    return response;
  } catch (error) {
   return {message : "error"}

  }
};


export const getProductsSort = async (queryString, sortBby, string) => {
  try {
    const qs = queryString ? `&${queryString}` : '';
    const response = await axios.get(`${getBaseUrl()}/api/product?${string}=${encodeURIComponent(sortBby)}${qs}`);
    return response;
  } catch (error) {
    return {message : "error"}
  }
};





