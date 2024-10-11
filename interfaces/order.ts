import { Address } from "./address";
import { OrderDetail } from "./order_detail";

export interface Order {

    id:string,
    status: string,
    date: Date,
    order_details: OrderDetail[] ,
    address: Address

}