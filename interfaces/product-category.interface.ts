import { Product } from "./product.interface";

export interface ProductCategory {
  id: string;
  category: string;
  products: Product[];
}