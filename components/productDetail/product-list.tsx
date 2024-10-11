import ProductCard from "./product-card";
import { Product } from "@/interfaces/product.interface";

interface ProductListProps {
  title: string;
  products: Product[] | null;
}

const ProductList: React.FC<ProductListProps> = ({ title, products }) => {
  return (
    <div>
      <h3 className="text-4xl font-bold mt-10">{title}</h3>
      <div className="flex gap-5 flex-wrap justify-evenly">
        {products?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
