import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Comment {
  id: string;
  description: string;
  customerId: User;
  productId: Product;
}