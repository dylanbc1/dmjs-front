'use client'
import style from '../../../components/navbar.module.css';
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Currency from "@/components/ui/currency"
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material';
import { useCart } from "@/hooks/cart/use-cart"
import { toast } from "react-hot-toast"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { orderApi, userApi } from "@/APIS"
import Cookies from "js-cookie";
import { Address } from "@/interfaces/address"
import { OrderApi } from "@/APIS/order.api"
import { User } from "@/interfaces/user"

const SummaryContent = () => {
    
    const searchParams = useSearchParams()
    const items = useCart((state) => state.items)
    const removeAll = useCart((state) => state.removeAll)
    const [user, setUser] = useState<User | null>()
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [Addreses, setAdresses] = useState<Address[]>();

    useEffect(() => {
        setTotalPrice(calculateTotalPrice);
    })

    useEffect(() => {
        if (searchParams.get('success')) {
            toast.success('Order placed successfully')
            removeAll()
        }

        if (searchParams.get('cancelled')) {
            toast.error('Order cancelled')
        }
        
    }, [searchParams, removeAll])

    useEffect(()=>{
        const fetchData = async () =>{
            const currentUser = Cookies.get("currentUser");
            if (currentUser) {
              setUser(JSON.parse(currentUser));
              const res = await userApi.findOneUser(JSON.parse(currentUser)?.id)
              setAdresses(res?.addresses)
            }
        }

        fetchData();
    },[])

    const calculateTotalPrice = items.reduce((acc, item) => {
        return acc + Number(item.price)
    }, 0)

    const onCheckout = async () =>{
        //const order = await orderApi.createOrder('PENDING', new Date(),user.id, )
    }

    const handleOpen = () => {
        if(user){
            setOpen(true);
        }else{
            toast.error('Necesitas estar logueado para realizar esta acción.')
        }
        
    };

    const handleClose = () => {
        setOpen(false);
    };

    //const handleSelectChange = (event) => {
        //setSelectedValue(event.target.value);
    //};

    const handleConfirm = async () => {
        if(user){
            try {
                const order = await orderApi.createOrder('PENDING', new Date(),user.id, 'bee0c58c-1503-4f3e-a8a8-a6d8a3cdcaa4', selectedValue )
                console.log(order)
                for (const item of items) {
                    const res = await orderApi.createOrderDetail(item.quantity, order?.id, item.id);
                    console.log(res);
                }
                
                window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/paypal/create/${order?.id}`
                localStorage.removeItem('cart-storage')
                setOpen(false);
            } catch {
                toast.error('Debes seleccionar una dirección. Si no tienes una, creala en tu perfil.')
            }
        }
        
        
    };

    return (
        <div className="sticky top-24 mt-16 rounded-lg bg-white shadow-md px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-semibold text-gray-900">
                Resumen de orden
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-semibold text-gray-900">
                        Order total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button className={`${style.primaryBtn} w-full mt-6`} onClick={handleOpen}>
                Checkout
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Selecciona la direccion a enviar</DialogTitle>
                <DialogContent>
                    <Select
                        value={selectedValue}
                        onChange={(e)=>setSelectedValue(e.target.value)}
                        fullWidth
                    >
                        {Addreses?.map((address, index) => (
                            <MenuItem value={address.id} key={index}>{address.avenue}  {address.street} # {address.house_number}</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={`${style.secondaryBtn}`}>
                        Cancela
                    </Button>
                    <Button  onClick={handleConfirm} className={`${style.primaryBtn}`}>
                        Confirma
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export const Summary = () => {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <SummaryContent />
        </Suspense>
    )
}
