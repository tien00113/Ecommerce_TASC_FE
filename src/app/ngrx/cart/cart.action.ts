import { createAction, props } from "@ngrx/store";
import { CartItem } from "../../models/CartItem";

export const addToCart = createAction('[Cart] addtoCart', props<{cartItem: CartItem }>());
export const addToCartSuccess = createAction('[Cart] addtoCart success', props<{ cartItem: any }>());
export const addToCartFailture = createAction('[Cart] addtoCart failture', props<{error: any}>());

export const navigateToCart = createAction('[Cart] navigateToCart')

export const removeCartItem = createAction('[Cart] removeCartItem', props<{itemId: number}>());
export const removeCartItemSuccess = createAction('[Cart] removeCartItem success', props<{ message: any, itemId: number}>());
export const removeCartItemFailture = createAction('[Cart] removeCartItem failture', props<{ error: any }>());

export const getUserCart = createAction('[Cart] getUserCart');
export const getUserCartSuccess = createAction('[Cart] getUserCart success', props<{ cart: any }>());
export const getUserCartFailture = createAction('[Cart] getUserCart failture', props<{ error: any }>());


