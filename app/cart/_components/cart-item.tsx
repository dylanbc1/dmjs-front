'use client'

import Image from "next/image"
import { toast } from 'react-hot-toast'
import { X } from 'lucide-react'

import IconButton from "@/components/ui/icon-button"
import Currency from "@/components/ui/currency"
import { useCart } from "@/hooks/cart/use-cart"
import { Product } from "@/interfaces/product.interface"
import { getProductById } from "@/actions/get-product"

interface CartItemProps {
    data: Product
}

export const CartItem = ({ data }: CartItemProps) => {
    const cart = useCart()
    const item = cart.items.find((item) => item.id === data.id)

    const onRemove = () => {
        cart.removeItem(data.id)
    }

    const incrementQuantity = () => {
        cart.incrementQuantity(data.id)
    }

    const decrementQuantity = () => {
        cart.decrementQuantity(data.id)
    }

    const verifyStock = async () => {
        const product: Product = await getProductById(data.id);
        
        if (item) {
            if (Number(product.quantity) - item.quantity > 0) {
                incrementQuantity();
            } else {
                toast.error('No hay suficiente stock')
            }
        } else {
            toast.error('Error cargando el producto')
        }
    }

    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.photo_url[0]}
                    alt=''
                    className="object-cover object-center " />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-[1] right-0 top-0">
                    <IconButton onClick={onRemove} icon={<X size={15} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold text-black ">
                            {data.product_name}
                        </p>
                    </div>
                    <div className="mt-1 flex text-sm">
                        <Currency value={data.price} />
                    </div>
                    <div className="mt-1 flex items-center">
                        <button onClick={decrementQuantity} className="px-2 py-1">-</button>
                        <span className="px-2">{item?.quantity}</span>
                        <button onClick={verifyStock} className="px-2 py-1">+</button>
                    </div>
                </div>
            </div>
        </li>
    )
}
