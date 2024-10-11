"use client";
import Image from "next/image";
import { Product } from "../../interfaces/product.interface";
import IconButton from "./icon-button";
import { Computer, Expand, HardDrive, Monitor, Mouse, ShoppingCart, Webcam } from "lucide-react";
import Currency from "./currency";
import { toast } from "react-hot-toast";
import { MouseEventHandler } from "react";
import { useCart } from "@/hooks/cart/use-cart";
import { useRouter } from "next/navigation";
import { getProductById } from "@/actions/get-product";
import { ProductCategory } from "@/interfaces/product-category.interface";
import { getProductsFiltered } from "@/cookies/filtered-products.cookies";
import { useCategories } from "@/hooks/use-categories";

interface CategoryCardProps {
  data: ProductCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
  const router = useRouter();
  const { handleCategoryClick } = useCategories({ router });
  const iconSize = 32;

  return (
    <div
      onClick={() => handleCategoryClick(data.category)}
      className="flex-col w-[140px] h-[140px] border-[#1c1c3c] border rounded-full flex items-center justify-center cursor-pointer font-bold bg-white hover:shadow-[0_0_0_4px_#1c1c3c] transition-all ease-in-out"
    >
      {data.category === 'Computadores' ? <Computer size={`${iconSize}`} /> : null}
      {data.category === 'Monitores' ? <Monitor size={`${iconSize}`} /> : null}
      {data.category === 'Accesorios' ? <Webcam size={`${iconSize}`} /> : null}
      {data.category === 'Periféricos' ? <Mouse size={`${iconSize}`} /> : null}
      {data.category === 'Componentes' ? <HardDrive size={`${iconSize}`} /> : null}
      {data.category}
    </div>
  );
};

export default CategoryCard;
