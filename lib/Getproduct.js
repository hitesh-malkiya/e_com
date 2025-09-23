import axios from "axios";

// Resolve a safe base URL
// - In the browser: use relative URLs ('') so axios hits the same origin
// - On the server: use env fallback or localhost
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXTAUTH_URL|| 'http://localhost:3000';
};

export const getProducts = async (queryString) => {
  try {
const response = await axios.get(`${getBaseUrl()}/api/product?${queryString}`)
return response
  } catch (error) {
   
   
  }
}


export const getProductsSort= async (queryString, sortBby, string) => {
  try {
const qs = queryString ? `&${queryString}` : ''
const response = await axios.get(`${getBaseUrl()}/api/product?${string}=${encodeURIComponent(sortBby)}${qs}`)
return response
  } catch (error) {

   
  }
}


export const getCardProduct= async (queryString, user) => {
  try {
const prefix = queryString ? (queryString.startsWith('?') ? '' : '?') : ''
const response = await axios.get(`${getBaseUrl()}/api/user${queryString ? `${prefix}${queryString}` : ''}` ,{
  headers: { 'x-username': user }
  })
return response
  } catch (error) {

   
  }
}




