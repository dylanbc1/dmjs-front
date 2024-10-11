import { getAuthorizationHeader } from '@/APIS/getAuthorizationHeader';
import axios from 'axios';
import { cookies } from 'next/headers';

export const getOrders = async () => {
  const cokie = cookies()
  const currentUserCookie = cokie.get('currentUser');
    try {
      const currentUser = currentUserCookie ? JSON.parse(currentUserCookie.value) : null;
        
      const token = currentUser?.token;
        const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+`/reports/orders`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
          
        }); 

        //console.log('aqui',response)

        
       
        return response.data;
        
        
      } catch (error) {
            
        return []
      }
}