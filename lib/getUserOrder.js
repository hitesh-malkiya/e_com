
import axios from 'axios';




export const getUser= async (userName) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user?userName=${userName}`,{
  
    });
    return response;
  } catch (error) {
 
  
  }
};

export const getOrder= async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/payment?id=${id}`,{

    });
    return response;
  } catch (error) {
 
  
  }
};


export const trackOrder = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/trackOrder?id=${id}`)
    
    return response.data;
    } catch(error) {  
      return { success: false, error: error.message || 'Error tracking order' };
    }
  }
  
export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/orderGet?id=${id}`)
  
console.log(response.data);

    let res = response.data.data
    return res;
    } catch(error) {  
      return { success: false, error: error.message || 'Error tracking order' };
    }
  }