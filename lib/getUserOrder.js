
import axios from 'axios';


const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXTAUTH_URL;
};

export const getUser= async (userName) => {
  try {
    const response = await axios.get(`${getBaseUrl()}/api/user?userName=${userName}`,{
  
    });
    return response;
  } catch (error) {
 
  
  }
};

export const getOrder= async (id) => {
  try {
    const response = await axios.get(`${getBaseUrl()}/api/payment?id=${id}`,{

    });
    return response;
  } catch (error) {
 
  
  }
};


export const trackOrder = async (id) => {
  try {
    const response = await axios.get(`${getBaseUrl()}/api/trackOrder?id=${id}`)
    
    return response.data;
    } catch(error) {  
      console.log(error);
      return { success: false, error: error.message || 'Error tracking order' };
    }
  }
  
export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${getBaseUrl()}/api/orderGet?id=${id}`)
    
    return response.data;
    } catch(error) {  
      console.log(error);
      return { success: false, error: error.message || 'Error tracking order' };
    }
  }