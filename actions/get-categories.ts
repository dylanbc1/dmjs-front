import axios from "axios";

export const getCategories = async () => {
    
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/product-category"); 
        const product = response.data
        return product
      } catch (error) {
            console.error("Categories not found:", error);
        return error
      }
}