
import axios from 'axios';


const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXTAUTH_URL || 'http://localhost:3001';
};

export const getProducts = async (queryString) => {
  try {
    const response = await axios.get(`${getBaseUrl()}/api/product?${queryString}`);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const getProductsSort = async (queryString, sortBby, string) => {
  try {
    const qs = queryString ? `&${queryString}` : '';
    const response = await axios.get(`${getBaseUrl()}/api/product?${string}=${encodeURIComponent(sortBby)}${qs}`);
    return response;
  } catch (error) {
    console.error('Error fetching sorted products:', error);
    throw error;
  }
};





