import { format } from 'date-fns'

import { formatCurrency } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'


export const CustomTooltip = ({ active, payload }: any) => {
    if( !active ) return null

    const date = payload[0].payload.date
    const income = payload[0].value

    return (
        <div className='rounded-sm bg-white shadow-sm border overflow-hidden'>
            <div className='text-sm p-2 px-3 bg-muted text-muted-foreground'>
                {format(date, 'MMM dd, yyyy')}
            </div>
            <Separator className='border-t' />
            <div className='p-2 px-3 space-y-1'>
                <div className='flex items-center justify-between gap-x-4'>
                    <div className='flex items-center gap-x-2'>
                        <div className='size-1.5 bg-[#2a2a5a] rounded-full' />
                        <p className='text-sm text-muted-foreground'>
                            Ingreso
                        </p>
                        </div>
                        <p className='text-sm text-right font-medium'>
                            {formatCurrency(income)}
                        </p>
                    </div>
            </div>
        </div>
    )
}