import { useState } from 'react';
import { orderApi, userApi } from "@/APIS";
import { z } from "zod";
import { OrderSchema } from "@/schemas";
import { updateUser } from '@/actions/update-user';
import toast from 'react-hot-toast';

type FormValues = z.input<typeof OrderSchema>;

export const useUpdateOrder = (id: string, onClose: { (): void; (): void; }, onOrderUpdate: { (): void; }) => {
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<null | any>(null);
    
    const onSubmit = async (values: FormValues) => {
        setUpdating(true);
        
        try {
            const order = await orderApi.updateOrders(id, values.status, values.date, values.customer_id, values.payment_method_id);
            toast.success('Orden editada.')
            onClose();
            onOrderUpdate();
        } catch (err) {
            toast.error('Error editando orden.');
        } finally {
            setUpdating(false);
        }
    };

    return { onSubmit, updating, error };
};
