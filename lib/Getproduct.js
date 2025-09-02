import axios from 'axios'


export  const getProducts = async (queryString) => {
  
    const response = await axios.get(`/api/product${queryString}`);
return response;
   

  }
