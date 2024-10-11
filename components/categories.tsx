import React from 'react';
import { Product } from '../interfaces/product.interface';
import ProductCard from './ui/product-card';
import CategoryCard from './ui/category-card';
import { ProductCategory } from '@/interfaces/product-category.interface';
 
interface Categories {
  title: string;
  items: ProductCategory[];
}

const Categories: React.FC<Categories> = ({title, items}) => {
  return (
    <div className="w-full space-y-10 mt-5">
      <h3 className="font-bold text-3xl">{title}</h3>
      <div className="flex gap-5 flex-wrap justify-evenly items-center">
        {
            items.map((item) => <CategoryCard data={item} key={item.id} /> )
        }
    </div>
    </div>
  );
};

export default Categories;
