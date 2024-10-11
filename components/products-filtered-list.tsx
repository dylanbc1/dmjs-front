'use client'
import React, { useState } from 'react';
import { Product } from '../interfaces/product.interface';
import NoResults from "../components/ui/no-results";
import ProductCard from './ui/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { AscDesc } from './asc-desc';

interface Query {
  queryType: string | undefined;
  queryValue: string | undefined;
}

interface ProductListProps {
  title: string;
  items: Product[];
  productFilteredBadge: Query;
}

export const ProductFilteredList: React.FC<ProductListProps> = ({ title, items, productFilteredBadge }) => {
  const [sortCriteria, setSortCriteria] = useState<string>('');

  function handleSort (criteria: string) {
    setSortCriteria(criteria);
  };

  const filteredItems = items.filter(item => item.quantity > 0);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortCriteria === 'priceAscendente') {
      return a.price - b.price;
    } else if (sortCriteria === 'priceDescendente') {
      return b.price - a.price;
    } else if (sortCriteria === 'stockAscendente') {
      return a.quantity - b.quantity;
    } else if (sortCriteria === 'stockDescendente') {
      return b.quantity - a.quantity;
    }
    return 0;
  });

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
    <div className='flex justify-between flex-wrap gap-2'>
        <Badge style={{ backgroundColor: '#1c1c3c' }}>{`Resultados de ${productFilteredBadge?.queryType}: ${productFilteredBadge?.queryValue}`}</Badge>
        <div className='flex gap-3'>
        <AscDesc title="Precio" handleSort={handleSort}/>
        {/*<AscDesc title="Stock" handleSort={handleSort}/>*/}
        </div>
    </div>

      {sortedItems.length === 0 ? (
        <NoResults />
      ) : (
        <div className="flex flex-wrap justify-center gap-5">
          {sortedItems.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};