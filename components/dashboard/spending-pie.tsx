
import {
    Card, 
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { FileSearch, PieChart } from "lucide-react";
import { AreaVariant } from "./area-variant";
import { PieVariant } from "./pie-variant";


type Props = {
    data?:{
        category: string;
        sales: number;
    }[]
}

export const SpendingPie = ({data = []}:Props) => {
    
    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row
             lg:items-center justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Categorias
                </CardTitle>
            </CardHeader>
            <CardContent>
               {data.length === 0 ? (
                   <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                    
                    <PieChart className="size-6 text-muted-foreground"/>
                    <p className="text-muted-foreground text-sm">
                        No data available
                    </p>
                </div>
               ): (
                <PieVariant data={data}/>
               )}
            </CardContent>
        </Card>
    )
}