'use server';

import * as z from 'zod';
import axios from 'axios';
import { LoginSchema } from '@/schemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedValues = LoginSchema.safeParse(values);

    if (!validatedValues.success) {
        return {  error: validatedValues.error.errors[0].message }
    }

    const { email, password  } = validatedValues.data;

   try {

        const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/auth/login`,{
            email,
            password,
        })

        if (response.status === 200) {
            return { success: 'User exists!' };
        } else {
            return { error: 'Unregistered user' };
        }

   }    catch(error){
    if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || 'Failed to validate user' };
    } else {
        return { error: 'An unexpected error occurred' };
    }
   }

}