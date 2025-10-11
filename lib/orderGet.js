import axios from 'axios';


const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXTAUTH_URL;
};

export const getorder = async (admin) => {
  try {
    const response = await axios.get(`${getBaseUrl()}/api/payment?admin=${admin}`);
    return response.data;
  } catch (error) {
    return {message : "error"}
  }
};