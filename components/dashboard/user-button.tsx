'use client'

import {FaUser} from 'react-icons/fa';
//import { ExitIcon, ReaderIcon, InfoCircledIcon } from '@radix-ui/react-icons'; 
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
import { LogoutButton } from './logout-button';
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';


export const UserButton = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage/>
                    <AvatarFallback className='bg-purple-dark'>
                        <User className='font-medium hover:font-semibold text-[#cecece] hover:text-white transition-all duration-300'/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40 px-4 bg-[#2a2a5a] text-white border-none' align='end'>                
            
                <LogoutButton>
                        Cerrar sesión
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};