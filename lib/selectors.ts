import { createSelector } from "reselect";
import { RootState } from "@/store/store";

const selectCartState = (state: RootState) => state.cart;
const selectUserState = (state: RootState) => state.user;

export const selectCheckoutData = createSelector(
  [selectCartState, selectUserState],
  (cart, user) => ({
    totalPrice: cart.totalPrice,
    cartItems: cart.cart,
    user: user.user,
  }),
);

export const selectIsLoggedIn = createSelector(
  [selectUserState],
  (userState) => userState.isLoggedIn,
);

export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user,
);
export const selectCartItems = createSelector(
  [selectCartState],
  (cartState) => cartState.cart,
);

export const selectTotalItems = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.length,
);

export const selectIsCartEmpty = createSelector(
  [selectTotalItems],
  (totalItems) => totalItems === 0,
);
export const selectTotalPrice = createSelector(
  [selectCartState],
  (cartState) => cartState.totalPrice,
);
