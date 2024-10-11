
import { getAuthorizationHeader } from '@/APIS/getAuthorizationHeader';
import axios from 'axios';


export const updateUser = async (id:string, name:string, password:string, email:string, photo_url:string, role:string, status:string) => {
    
    
        
        
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`, 
                {
                    name: name,
                    email: email,
                    role: role, 
                    photo_url: photo_url,
                    status: status
                },
                {
                    headers: getAuthorizationHeader()
                }
            );
        
        return response.data;
    }catch(error) {
        
        return error;
    }
}
