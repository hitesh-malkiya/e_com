import axios from 'axios';


const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXTAUTH_URL || 'http://localhost:3001';
};

export const getorder = async (admin) => {
  try {
    const response = await axios.get(`${getBaseUrl()}/api/payment?admin=${admin}`);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};