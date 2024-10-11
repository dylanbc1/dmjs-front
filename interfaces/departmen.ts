import { City } from "./city";

export interface Department {
    id:string,
    name:string;
    cities: City[],
}