import { create } from 'zustand'
import { Product } from '@/interfaces/product.interface'


interface PreviewModalState {
    isOpen: boolean
    product?: Product 
    onOpen: (product: Product) => void
    closeModal: () => void
}

export const usePreviewModal = create<PreviewModalState>((set) => ({
    isOpen: false,
    product: undefined,
    onOpen: (product: Product) => set({ isOpen: true, product: product }),
    closeModal: () => set({ isOpen: false })
}))

