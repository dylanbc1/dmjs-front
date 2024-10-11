import {create} from 'zustand';

type OpenOrderState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
};

export const useOpenOrder = create<OpenOrderState>((set) => (
    
    {
    id: undefined,
    isOpen: false,
    onOpen: (id) => set( { isOpen: true, id }),
    onClose: () => set({ isOpen: false , id : undefined})
}));
