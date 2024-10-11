import { useState, useEffect } from 'react';
import { getUserById } from "@/actions/get-user-id";
import { orderApi } from '@/APIS';

interface Order {
    id: string;
    status: string;
    date: Date;
    customer_id: string;
    payment_method_id: string;
}


export const useOrderData = (id: string) => {
    
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    useEffect(() => {
        if (!id) {
            setOrder(null);
            setLoading(false);
            return;
        };

        const fetchUser = async () => {
            try {
                const userData = await orderApi.findOneOrders(id);
                setOrder(userData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);
    
    return { order, loading, error };
};
