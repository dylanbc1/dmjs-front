import styles from "../navbar.module.css";
import { Product } from '@/interfaces/product.interface'
import Currency from '../ui/currency'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/cart/use-cart'
import { MouseEventHandler } from 'react'
import toast from 'react-hot-toast'
interface InfoProps {
    data: Product
}


export const Info = ({data}: InfoProps) => {

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
    
    return (
        <div>
            <h1 className='text-3xl font-bold text-gray-900'>
                {data.product_name}
            </h1>
            <div className='mt-3 flex items-end justify-between'>
                <p className='text-2xl text-gray-900'>
                    <Currency value={data.price} />
                </p>
            </div>
            <hr className='my-4'/>
            <div className='flex flex-col gap-y-6'>
                <div className='flex items-center gap-x-4'>
                    <h3 className='font-semibold text-black'>
                        Categoría:
                    </h3>
                    <div>
                        {data.product_category.category}
                    </div>
                </div>
            </div>
            <div className='mt-10 flex items-center gap-x-3'>
                <Button onClick={onAddToCart} className={`${styles.primaryBtn} flex items-center gap-x-2`}>
                    Añadir al carrito
                </Button>
            </div>
        
        </div>
    )
}