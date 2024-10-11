import { User } from "./user.interface";
import { City } from "./city.interface";

export interface Address {
  id: string;
  street: string | null;
  avenue: string | null;
  house_number: string;
  user: User;
  city: City;
}