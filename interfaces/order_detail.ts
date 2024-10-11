import { Product } from "./product";

export interface OrderDetail{
    id:string,
    quantity: number,
    product: Product
}