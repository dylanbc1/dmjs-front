import { Address } from "./address.interface";
import { Department } from "./department.interface";

export interface City {
  id: string;
  name: string;
  addresses: Address[];
  department: Department;
}