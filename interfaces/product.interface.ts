import { Review } from "./review.interface";
import { OrderDetail } from "./order-detail.interface";
import { ProductCategory } from "./product-category.interface";
import { Comment } from "./comment.interface";
import { User } from "./user.interface";

export interface Product {
  id: string;
  product_name: string;
  description: string | null;
  price: number;
  photo_url: string[];
  order_details?: OrderDetail[];
  reviews?: Review[];
  product_category: ProductCategory;
  comments?: Comment[];
  seller: User;
  quantity: number;
}