import { Address } from "./address.interface";
import { Order } from "./order.interface";
import { Comment } from "./comment.interface";
import { Review } from "./review.interface";
import { Product } from "./product.interface";

export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  addresses: Address[];
  orders?: Order[];
  comments: Comment[];
  reviews: Review[];
  products?: Product[];
  photo_url: string;
  favorites: Product[];
}