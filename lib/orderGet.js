import axios from 'axios';




export const getorder = async (admin) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/payment?admin=${admin}`);
    return response.data;
  } catch (error) {
    return {message : "error"}
  }
};