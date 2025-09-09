import axios from "axios";

export const getProducts = async (queryString) => {
  try {
const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/product?${queryString}`)
return response
  } catch (error) {
    console.error('Error fetching products:', error);
   
  }
}


export const getProductsSort= async (queryString, sortBby, string) => {
  try {
const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/product?${string}=${sortBby}&${queryString}`)
return response
  } catch (error) {
    console.error('Error fetching products:', error);
   
  }
}


export const getCardProduct= async (queryString, user) => {
  try {
const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/user${queryString}` ,{
  headers: { 'x-username': user }
  })
return response
  } catch (error) {
    console.error('Error fetching products:', error);
   
  }
}




