'use server';

import * as z from 'zod';
import axios from 'axios';
import { RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedValues = RegisterSchema.safeParse(values);

    if (!validatedValues.success) {
        return {  error: validatedValues.error.errors[0].message }
    }

    const { email, password, name,  } = validatedValues.data;

   try {

        const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/users`,{
            email,
            password,
            name,
            'role': 'USER',
            'photo_url': ''
        })

        if (response.status === 201) {
            return { success: 'User created!' };
        } else {
            return { error: 'Failed to create user' };
        }

   }    catch(error){
    if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || 'Failed to create user' };
    } else {
        return { error: 'An unexpected error occurred' };
    }
   }
       
}