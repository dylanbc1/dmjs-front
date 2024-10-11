import axios from 'axios';

export const getProductById = async (id:string) => {
    
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+`/products/${id}`); 
        const product = response.data
        return product
      } catch (error) {
            console.error("Product not found:", error);
        return error
      }
}