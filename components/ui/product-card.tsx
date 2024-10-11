"use client";

import Image from "next/image";
import React, { MouseEventHandler } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { Product } from "../../interfaces/product.interface"
import IconButton from "./icon-button"
import { Expand, ShoppingCart } from "lucide-react"
import Currency from "./currency"
import { toast } from 'react-hot-toast'
import { useCart } from "@/hooks/cart/use-cart"
import { useRouter } from "next/navigation"
import { usePreviewModal } from "@/hooks/cart/use-preview-modal"

interface ProductCard {
    data: Product
}

const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};

export const ProductCard: React.FC<ProductCard> = ({data}: ProductCard) => {
    const cart = useCart()

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event?.stopPropagation()

        const product = cart.items.find((item) => item.id == data.id);
        
        if (product) {
            if (Number(data.quantity == 0)) {
                toast.error('No hay suficiente stock.')
            } /*else if (Number(data.quantity) - Number(product.quantity) > 0) {
                cart.incrementQuantity(product.id);
            } */else {
                toast.error('Producto ya en el carrito, puedes aumentar la cantidad desde allí.', {icon: '⚠️'})
            }
        } else {
            if (Number(data.quantity == 0)) {
                toast.error('No hay suficiente stock.')
            } else {
                cart.addItem(data);
            }
        }
    }

    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }

    const previewModal = usePreviewModal()

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        previewModal.onOpen(data)
    }

    return (
        <div onClick={handleClick} className="cursor-pointer">
            <CardContainer className="inter-var h-96"> 
            <CardBody className="bg-gray-50 h-full group/card border-black/[0.1] w-[20rem] rounded-xl p-6 border flex flex-col justify-between"> 
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold min-h-[3rem]" 
                >
                    {truncateText(data.product_name, 40)}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-sm max-w-sm mt-2"
                >
                    <Currency value={data.price} />
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4 flex-grow flex items-center justify-center"> 
                    <Image
                        src={data.photo_url[0]}
                        height="500"
                        width="500"
                        className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-5">
                    <CardItem
                        translateZ={20}
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white w-full flex justify-between"
                    >
                        <div className="gap-2 flex flex-row">
                            <IconButton 
                                onClick={onPreview}
                                icon={<Expand size={20} className="text-gray-600" />}
                            />
                            <IconButton 
                                onClick={onAddToCart}
                                icon={<ShoppingCart size={20} className="text-gray-600" />}
                            />
                        </div>
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
        </div> 
    );
}

export default ProductCard;
