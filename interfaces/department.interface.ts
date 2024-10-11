import { City } from "./city.interface";

export interface Department {
  id: string;
  name: string;
  cities: City[];
}