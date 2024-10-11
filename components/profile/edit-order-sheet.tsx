import { userApi } from "@/APIS"
import { 
     Sheet,
     SheetContent,
     SheetDescription,
     SheetHeader,
     SheetTitle } from "@/components/ui/sheet"
import { OrderForm } from "./order-form"
import { z } from "zod"
import { UserSchema } from "@/schemas"
import { useUserData } from "@/hooks/user/use-user-data"
import { Loader2 } from "lucide-react"
import { useUpdateUser } from "@/hooks/user/use-update-user"
import { useOpenOrder } from "@/hooks/use-open-order"
import { useOrderData } from "@/hooks/use-order-data"
import { useUpdateOrder } from "@/hooks/use-update-order"

type FormValues = z.input<typeof UserSchema>

interface Order {
    id: string;
    status: string;
    date: Date;
    customer_id: string;
    payment_method_id: string;
}

type Props = {
    onOrderUpdate: () => void;
}

export const EditOrderSheet = ({ onOrderUpdate }: Props) => {
    const {isOpen, onClose, id} = useOpenOrder();
    const { order, loading, error } = useOrderData(id as string);
    const { onSubmit, updating } = useUpdateOrder(id as string, onClose, onOrderUpdate);
    console.log('user', order);
    const defaultValues: Order = {
        id: order?.id as string,
        status: order?.status as string,
        date: order?.date || new Date(),
        customer_id: order?.customer_id as string,
        payment_method_id: order?.payment_method_id as string
        
    };
    if (!order) return null;
    
    if (error) <div>Error: {error.message}</div>;
  
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 bg-white">
                <SheetHeader>
                    <SheetTitle>
                        Editar orden
                    </SheetTitle>
                    <SheetDescription>
                        Editar detalles de 
                    </SheetDescription>
                </SheetHeader>
                {loading 
                  ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                    </div>
                  ) : (
                    <OrderForm 
                        onSubmit={onSubmit} 
                        disabled={updating}
                        defaultValues={defaultValues}
                     />
                  )
                }
            </SheetContent>
        </Sheet>
    )
}
