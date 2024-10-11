import { City } from "./city";

export interface Address {
    id:string,
    street: string,
    avenue:string,
    house_number:number,
    city: City
}