import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  addToCartFailture,
  addToCartSuccess,
  getUserCart,
  getUserCartFailture,
  getUserCartSuccess,
  removeCartItem,
  removeCartItemFailture,
  removeCartItemSuccess,
} from './cart.action';

const initialState = {
  cartItem: null,
  loading: false,
  error: null,  
  message: null,
  cart: null,
  cartItems: [],
};

export const cartReducer = createReducer(
  initialState,

  //add to cart
  on(addToCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(addToCartSuccess, (state, { cartItem }) => ({
    ...state,
    loading: false,
    cartItem: cartItem,
    error: null,
  })),

  on(addToCartFailture, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  //remove item

  on(removeCartItem, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(removeCartItemSuccess, (state, { message, itemId }) => {
    const updatedCart =
      (state.cart as any)?.cartItems?.filter(
        (item: any) => item.id !== itemId
      ) ?? null;
    const totalItem = updatedCart.length;
    const totalPrice = updatedCart.reduce(
      (sum: number, item: any) => sum + (item.price || 0),
      0
    );
    console.log('updatecart after remove: ', updatedCart);
    return {
      ...state,
      loading: false,
      cart: {
        ...(state.cart as any),
        cartItems: updatedCart,
        totalItem: totalItem,
        totalPrice: totalPrice,
      },
      message: message,
      error: null,
    };
  }),

  on(removeCartItemFailture, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  //get user cart

  on(getUserCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(getUserCartSuccess, (state, { cart }) => ({
    ...state,
    loading: false,
    cart: cart,
    error: null,
  })),

  on(getUserCartFailture, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
