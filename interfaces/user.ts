import { Address } from "./address";

export interface User {
    id:string,
    name: string,
    password:string,
    email:string,
    photo_url:string,
    role: string,
    addresses: Address[]
}