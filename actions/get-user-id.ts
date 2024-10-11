import { getAuthorizationHeader } from '@/APIS/getAuthorizationHeader';
import axios from 'axios';

export const getUserById = async (id:string, token: string) => {
    console.log(id)
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+`/users/${id}`, {
            headers: getAuthorizationHeader()
        
        }); 
        const user = response.data
        
        return user
      } catch (error) {
            
        return error
      }
}