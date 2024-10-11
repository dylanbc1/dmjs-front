import { User } from "./user.interface";
import { PaymentMethod } from "./payment-method.interface";
import { OrderDetail } from "./order-detail.interface";

export interface Order {
  id: string;
  status: string;
  date: Date;
  customer: User;
  payment_method: PaymentMethod;
  order_details: OrderDetail[];
}