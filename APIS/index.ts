import { AddresApi } from "./address.api";
import { AuthApi } from "./auth.api";
//import { InventoryApi } from "./inventory.api";
import { OrderApi } from "./order.api";
import { ProductApi } from "./product.api";
import { ResourceApi } from "./resource.api";
import { UserApi } from "./user.api";

export const authApi = new AuthApi(process.env.NEXT_PUBLIC_API_BASE_URL || '')

export const userApi = new UserApi(process.env.NEXT_PUBLIC_API_BASE_URL || '')

export const resourceApi = new ResourceApi(process.env.NEXT_PUBLIC_API_BASE_URL || '')

export const productApi = new ProductApi(process.env.NEXT_PUBLIC_API_BASE_URL || '')

export const orderApi = new OrderApi(process.env.NEXT_PUBLIC_API_BASE_URL || '')

//export const inventoryApi = new InventoryApi('http://localhost:3001')

export const addressApi = new AddresApi(process.env.NEXT_PUBLIC_API_BASE_URL || '')