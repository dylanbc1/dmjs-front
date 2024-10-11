import { Order } from "./order.interface";
import { Product } from "./product.interface";

export interface OrderDetail {
  id: string;
  quantity: number;
  order: Order;
  product: Product;
}