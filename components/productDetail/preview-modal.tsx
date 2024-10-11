'use client'

import { usePreviewModal } from "@/hooks/cart/use-preview-modal"
import { Modal } from "./modal"
import { Gallery } from "./gallery"
import { Info } from "./info"

export const PreviewModal = () => {
    const previewModal = usePreviewModal()
    const product = usePreviewModal((state) => state.product)
    if(!product) return null
    return (
        <Modal 
         isOpen={previewModal.isOpen}
         onClose={previewModal.closeModal}>
            <div className="grid w-full grid-col-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                    <Gallery images={product.photo_url}/>
                </div>
                <div className="sm:col-span-8 lg:col-span-7 ">
                    <Info data={product}/>
                </div>
            </div>
        </Modal>
    )
}
