import { useState, useEffect } from 'react';
import { getUserById } from "@/actions/get-user-id";


interface User {
    name: string;
    email: string;
    role: string;
    password: string;
    photo_url: string;
    status: string
}

export const useUserData = (id: string, token: string) => {
    
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    useEffect(() => {
        if (!id) {
            setUser(null);
            setLoading(false);
            return;
        };

        const fetchUser = async () => {
            try {
                const userData = await getUserById(id, token);
                setUser(userData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, token]);
    
    return { user, loading, error };
};
