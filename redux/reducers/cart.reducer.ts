import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, CartActionTypes } from "../actions/cart.actions";
import { Product } from "@/interfaces/product.interface";

export interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (state = initialState, action: any): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer;