'use client'
import { toast } from 'react-hot-toast'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PayMethodCard from "./pay-method-card";
import { Product } from "@/interfaces/product.interface";
import { useCart } from "@/hooks/cart/use-cart";
import { MouseEventHandler, useState } from "react";
import {useRouter} from 'next/navigation';
import { User } from "@/interfaces/user";
import { Address } from "@/interfaces/address";
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from "@mui/material";
import { orderApi, productApi } from "@/APIS";
import styles from "../navbar.module.css";

interface ProductInformationProps {
  product: Product | null;
  user: User | null;
  addresses: Address[] | undefined
}

const ProductInformation : React.FC<ProductInformationProps> = ({ product, user, addresses }) => {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
    
  const cart = useCart()
  const router = useRouter()

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event?.stopPropagation()

    const productoncart = cart.items.find((item) => item.id == product?.id);
    
    if (product) {
      if (productoncart) {
        if (Number(product.quantity == 0)) {
            toast.error('No hay suficiente stock.')
        } /*else if (Number(product.quantity) - Number(productoncart?.quantity) > 0) {
          cart.incrementQuantity(product.id);
        }*/ else {
            toast.error('Producto ya en el carrito, puedes aumentar la cantidad desde allí.', {icon: '⚠️'})
        }
      } else {
        if (Number(product.quantity == 0)) {
            toast.error('No hay suficiente stock.')
        } else {
            cart.addItem(product);
        }
      }
    } else {
      toast.error('Error al cargar el producto.')
    }
}

  const handleBuyNow = () => {
    if (product) {
      if (product?.quantity > 0) {
        handleOpen();
      } else {
        toast.error('No hay suficiente stock.')
      }
    }
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

  const handleConfirm = async () => {
    if(user && product){
      const order = await orderApi.createOrder('PENDING', new Date(), user?.id, 'bee0c58c-1503-4f3e-a8a8-a6d8a3cdcaa4', selectedValue )
      console.log(order)
      const res = await orderApi.createOrderDetail(1, order?.id,product?.id )
      window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/paypal/create/${order?.id}`
      localStorage.removeItem('cart-storage')
      setOpen(false);
    }
  };
  
  const onBuyNow: MouseEventHandler<HTMLButtonElement> = (event) => {
    event?.stopPropagation()
    
    if (product) {
      cart.addItem(product);
    }
    
    router.push('/cart')
 }
 

  return (
    <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
      <div className="sticky top-16">
        <Card className="border-none shadow-none">
          <CardHeader className='px-0'>
            <CardTitle className="text-2xl sm:text-3xl font-bold">{product?.product_name}</CardTitle>
            <p className="text-gray-600">Vendido por: {product?.seller? product.seller.name : "Desconocido"}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${product?.price ? product.price : 0.0} COP</p>
            <p>Stock: {product?.quantity}</p>
          </CardContent>
          <CardFooter className="flex sm:flex-row gap-5">
            <Button className={`${styles.primaryBtn} w-full sm:w-1/2`} onClick={handleBuyNow}>Comprar</Button>
            <Button className={`${styles.secondaryBtn} w-full sm:w-1/2`} onClick={onAddToCart}>Añadir al carrito</Button>
          </CardFooter>
          <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Selecciona la dirección a enviar</DialogTitle>
                <DialogContent>
                    <Select
                        value={selectedValue}
                        onChange={(e)=>setSelectedValue(e.target.value)}
                        fullWidth
                    >
                        {addresses?.map((address, index) => (
                            <MenuItem value={address.id} key={index}>{address.avenue}  {address.street} # {address.house_number}</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button className={`${styles.secondaryBtn}`} onClick={handleClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button className={`${styles.primaryBtn}`} onClick={handleConfirm} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
      </div>
    </div>
  );
};

export default ProductInformation;
