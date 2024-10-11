import {create} from 'zustand';

type OpenUserState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
};

export const useOpenUser = create<OpenUserState>((set) => (
    //console.log('useOpenUser'),
    {
    id: undefined,
    isOpen: false,
    onOpen: (id) => set( { isOpen: true, id }),
    onClose: () => set({ isOpen: false , id : undefined})
}));
