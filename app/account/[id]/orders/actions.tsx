'use client'

import { useOpenUser } from '@/hooks/user/use-open-user'
import { Button } from '@/components/ui/button'
import { Edit, MoreHorizontal } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useOpenOrder } from '@/hooks/use-open-order'



type Props = {
    id: string
}


export const Actions = ({id}: Props) => {
   
    const { onOpen } = useOpenOrder()


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='size-8 p-0'>
                        <MoreHorizontal className="size-4" />
                    </Button>   
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                    className='cursor-pointer'
                        disabled={false}
                        onClick= {()=>onOpen(id)}
                    >
                        <Edit className="size-4 mr-2" />
                        Editar
                    </DropdownMenuItem>
                    
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}