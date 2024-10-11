'use client';
import { useEffect, useState, useCallback } from 'react';
import { clearFilteredProductsCookie, getFilteredProductsFromCookie, getQueryTypeFromCookie } from '@/cookies/filtered-products.cookies';
import { Product } from '@/interfaces/product.interface';
import { ProductFilteredList } from '@/components/products-filtered-list';
import Cookies from 'js-cookie';
import store from '@/redux/store';

const FilteredProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [queryType, setQueryType] = useState<string | undefined>(undefined);
  const [queryValue, setQueryValue] = useState<string | undefined>(undefined);

  const updateFilteredProducts = async () => {
    const storedProducts = localStorage.getItem('filteredProducts');
    if (storedProducts) {
      setFilteredProducts(JSON.parse(storedProducts));
    }
  };

  const updateQueryType = () => {
    const query = getQueryTypeFromCookie();
    setQueryType(query?.queryType);
  };

  const updateQueryValue = () => {
    const query = getQueryTypeFromCookie();
    setQueryValue(query?.value);
  };

  const updateWhenCookies = useCallback(() => {
    updateFilteredProducts();
    updateQueryType();
    updateQueryValue();
  }, []);

  useEffect(() => {
    updateWhenCookies();

    window.addEventListener('cookieChange', updateWhenCookies);

    return () => {
      window.removeEventListener('cookieChange', updateWhenCookies);
    };
  }, [updateWhenCookies]);

  return (
    <div className="flex flex-col w-full gap-y-8 mt-3">
      <ProductFilteredList
        title="Productos disponibles"
        items={filteredProducts || []}
        productFilteredBadge={{ queryType, queryValue }}
      />
    </div>
  );
};

export default FilteredProductsPage;
