'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { getUsers } from "@/actions/get-users";
import { EditUserSheet } from "@/components/user/edit-user-sheet"; // Adjust the import according to your file structure

const UsersClientPage = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);

    const fetchUsers = useCallback(async () => {
        const response = await getUsers(1, 50, 'ASC');
        setUsers(response.users);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers, reload]);

    const handleUserUpdate = () => {
        setReload(!reload);
    };

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Usuarios registrados
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        filterKey="email"
                        columns={columns}
                        data={users}
                        disabled={false}
                    />
                </CardContent>
            </Card>
            <EditUserSheet onUserUpdate={handleUserUpdate} />
        </div>
    );
}

export default UsersClientPage;
