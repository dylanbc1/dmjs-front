import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product } from '@/interfaces/product.interface'
import toast from 'react-hot-toast'

interface CartItem extends Product {
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
}

export const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if (existingItem) {
                set({
                    items: currentItems.map(item =>
                        item.id === data.id
                            ? { ...item, quantity: Number(item.quantity) + 1 }
                            : item
                    )
                });
                return toast('Cantidad actualizada', { icon: '🛒' });
            }

            set({ items: [...get().items, { ...data, quantity: 1 }] });
            toast.success('Producto añadido al carrito');
        },
        removeItem: (id: string) => {
            set({ 
                items: [...get().items.filter((item) => item.id !== id)] 
            });
            toast.success('Producto eliminado del carrito', { icon: '🛒' });
        },
        removeAll: () => set({ items: [] }),
        incrementQuantity: (id: string) => {
            set({
                items: get().items.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1, 
                            price: Number(item.price) + Number(item.price/item.quantity) 
                        }
                        : item
                ),
                
            });
        },
        decrementQuantity: (id: string) => {
            const currentItems = get().items;
            const itemToDecrement = currentItems.find((item) => item.id === id);

            if (itemToDecrement && itemToDecrement.quantity > 1) {
                set({
                    items: currentItems.map(item =>
                        item.id === id
                            ? { ...item, quantity: item.quantity - 1,
                                price: Number(item.price) - Number(item.price/item.quantity)
                             }
                            : item
                    )
                });
            } else {
                set({ items: [...currentItems.filter((item) => item.id !== id)] });
                toast.success('Product eliminado del carrito', { icon: '🛒' });
            }
        }
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
    })
);
