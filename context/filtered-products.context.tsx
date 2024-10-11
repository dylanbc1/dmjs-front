import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/interfaces/product.interface'; 

interface FilteredProductsContextType {
    filteredProducts: Product[];
    setFilteredProducts: (products: Product[]) => void;
}

const FilteredProductsContext = createContext<FilteredProductsContextType | undefined>(undefined);

export const FilteredProductsProvider = ({ children }: { children: ReactNode }) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    
    return (
        <FilteredProductsContext.Provider value={{ filteredProducts, setFilteredProducts }}>
            {children}
        </FilteredProductsContext.Provider>
    );
};

export const useFilteredProducts = () => {
    const context = useContext(FilteredProductsContext);
    if (!context) {
        throw new Error('useFilteredProducts must be used within a FilteredProductsProvider');
    }
    return context;
};
