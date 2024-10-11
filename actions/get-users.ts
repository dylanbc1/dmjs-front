import { getAuthorizationHeader } from '@/APIS/getAuthorizationHeader';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}
export const getUsers = async (page = 1 , take = 10 , order = 'ASC') => {
    try {
        
        const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+`/users`, {   
                headers: getAuthorizationHeader(),
                params: {
                    page,
                    take,
                    order
                }
            }
        ); 
        const {data, meta} = response.data;
        return {users: data, meta}
        
        
      } catch (error) {
        
        return {users: [], meta: null}
      }
}