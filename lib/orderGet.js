import axios from 'axios';




export const getorder = async (admin) => {
  try {
    const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/payment?admin=${admin}`);
    return response.data;
  } catch (error) {
    return {message : "error"}
  }
};