'use client'

import styles from "../navbar.module.css";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent
} from '@/components/ui/dropdown-menu'
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '@/components/ui/avatar'
import { LogoutButton } from '../dashboard/logout-button';
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import Cookies from 'js-cookie';
import { IconUser } from '@tabler/icons-react';
import { useRouter } from "next/navigation";

export const UserButton = () => {
    const router = useRouter()

    const onLogout = () => {
        Cookies.remove("currentUser");
        router.push("/");
    }

    let id = null;
    const currentUser = Cookies.get('currentUser');
    
    if (currentUser) {
        try {
            const parsedUser = JSON.parse(currentUser);
            id = parsedUser.id;
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }

    return (
        <div className='flex items-center rounded-full bg-transparent'>
            <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage/>
                    <AvatarFallback className='bg-purple-dark'>
                        <User className='text-[#cecece] hover:text-white transition-all duration-300'/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-4 bg-[#2A2A5A] text-white border-none" align='end'>
                <DropdownMenuItem className={`${styles.navLink}`}>
                    {id ? (
                        <Link href={`/account/${id}`} className='flex items-center'>
                            
                            Perfil
                        </Link>
                    ) : (
                        <span className='flex items-center'>
                            <User className='size-4 mr-2' />
                            Perfil
                        </span>
                    )}
                </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout} className={`${styles.navLink} cursor-pointer`}>
                        Cerrar sesión
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
    );
};
