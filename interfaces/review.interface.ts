import { User } from "./user.interface";
import { Product } from "./product.interface";

export interface Review {
  id: string;
  score: number;
  comment?: string;
  customer: User;
  product: Product;
}