import { Product } from "@/interfaces/product.interface";

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: string;
}

export interface ClearCartAction {
  type: typeof CLEAR_CART;
}

export type CartActionTypes = AddToCartAction | RemoveFromCartAction | ClearCartAction;