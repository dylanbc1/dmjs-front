import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/interfaces/product.interface";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="mt-4 w-1/4">
      <Card>
        <CardHeader>
          <CardTitle>{product?.product_name ? product.product_name : 'Cargando...'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={product?.photo_url[0] ? product.photo_url[0] : ""}
            alt={product?.product_name ? product.product_name : "Producto vacío"}
            width={100}
            height={100}
            className="rounded-lg"
          />
          <p className="text-2xl font-bold mt-4">${product?.price ? product.price : '0.00'} USD</p>
          {/* Falta codigo */}
          <p>Stock: 0</p>
        </CardContent>
        <CardFooter>
          <Button>View product</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
