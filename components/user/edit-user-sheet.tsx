import { userApi } from "@/APIS"
import { 
     Sheet,
     SheetContent,
     SheetDescription,
     SheetHeader,
     SheetTitle } from "@/components/ui/sheet"
import { useOpenUser } from "@/hooks/user/use-open-user"
import { UserForm } from "./user-form"
import { z } from "zod"
import { UserSchema } from "@/schemas"
import { useUserData } from "@/hooks/user/use-user-data"
import { Loader2 } from "lucide-react"
import { useUpdateUser } from "@/hooks/user/use-update-user"

type FormValues = z.input<typeof UserSchema>

interface User {
    name: string;
    email: string;
    role: string;
    password: string;
    photo_url: string;
    status: string;
}

type Props = {
    onUserUpdate: () => void;
}

export const EditUserSheet = ({ onUserUpdate }: Props) => {
    const {isOpen, onClose, id} = useOpenUser();
    const { user, loading, error } = useUserData(id as string, 'token');
    const { onSubmit, updating } = useUpdateUser(id as string, onClose, onUserUpdate);
    
    const defaultValues: User = {
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '',
        password: user?.password || '',
        photo_url: user?.photo_url || '',
        status: user?.status || ''
    };
    if (!user) return null;
    
    if (error) return <div>Error: {error.message}</div>;
  
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 bg-[white]">
                <SheetHeader>
                    <SheetTitle>
                        Editar usuario
                    </SheetTitle>
                    <SheetDescription>
                        Editar detalles de usuario
                    </SheetDescription>
                </SheetHeader>
                {loading 
                  ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                    </div>
                  ) : (
                    <UserForm 
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
