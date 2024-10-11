import { Order } from "./order.interface";

export interface PaymentMethod {
  id: string;
  payment_name: string;
  orders: Order[];
}