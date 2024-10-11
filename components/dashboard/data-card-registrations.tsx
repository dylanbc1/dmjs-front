import { VariantProps, cva } from "class-variance-authority"
import { IconType} from "react-icons"
import { CountUp } from '@/components/dashboard/count-up'
import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
     } from "../ui/card"


const boxVariant = cva(
    'shrink-0 rounded-md p-3',
    {
        variants: {
            variant:{
                default: 'bg-blue-500/20',
                success: 'bg-emerald-500/20',
                danger: 'bg-rose-500/20',
                warning: 'bg-yellow-500/20',
            }
        },
        defaultVariants:{
            variant: 'default'
        
        }
    }
)

const iconVariant = cva(
    'size-6',
    {
        variants: {
            variant:{
                default: 'fill-blue-500',
                success: 'fill-emerald-500',
                danger: 'fill-rose-500',
                warning: 'fill-yellow-500',
            }
        },
        defaultVariants:{
            variant: 'default'
        
        }
    }
)

type BoxVariants = VariantProps<typeof boxVariant>
type IconVariants = VariantProps<typeof iconVariant>

interface DataCardProps extends BoxVariants, IconVariants {
    icon : IconType
    title: string
    value?: number
    dateRange: string
    percentage?: number 
}


export const DataCardRegistrations = ({
    icon: Icon,
    title,
    value = 0,
    variant,
    dateRange,
    percentage = 0

}: DataCardProps) => {
   return (
     <Card className="border-none drop-shadow-sm ">
        <CardHeader className="flex flex-row items-center justify-between gap-x-4">
            <div className="space-y-2">
                <CardTitle className="text-2xl line-clamp-1">
                    {title}
                </CardTitle>
                <CardDescription className="line-clamp1">
                    {dateRange}
                </CardDescription>
            </div>
            <div className={cn(
                boxVariant({variant}),

            )}>
                <Icon className={cn(iconVariant({variant}))}/>

            </div>
        </CardHeader>
        <CardContent >
            <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
                <CountUp
                 preserveValue
                 start={0}
                 end={value}
                 decimals={2}
                 decimalPlaces={2}
                 formattingFn={(val: number) => val.toString()}
                  />
            </h1>
            <p className={cn(
                'text-muted-foreground text-sm line-clamp-1',
                percentage > 0 ? 'text-emerald-500' : 'text-rose-500'
            )}>
                {formatPercentage(percentage)} desde el último periodo
            </p>
        </CardContent>
     </Card>
   )  
}