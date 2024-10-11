import * as z from 'zod';
import axios from 'axios';
import { CommentSchema } from '../schemas';

export const createComment = async (values: z.infer<typeof CommentSchema>) => {
    const validatedValues = CommentSchema.safeParse(values);
            
    if (!validatedValues.success) {
        return {  error: validatedValues.error.errors[0].message };
    }

    const { description, user_id, product_id  } = validatedValues.data;

   try {

        const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/comments`,{
           description,
            user_id,
            product_id
        })

        if (response.status === 201) {
            return { success: 'Comentario enviado!' };
        } else {
            return { error: 'Hubo un fallo al enviar el comentario' };
        }

   }    catch(error){
    if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || 'Hubo un fallo al enviar el comentario' };
    } else {
        return { error: 'Un error inesperado ha ocurrido' };
    }
   }

}