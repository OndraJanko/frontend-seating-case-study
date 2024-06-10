import { createSelector } from "reselect";
import { RootState } from "@/store/store";

const selectCart = (state: RootState) => state.cart;
const selectUser = (state: RootState) => state.user;

export const selectCheckoutData = createSelector(
  [selectCart, selectUser],
  (cart, user) => ({
    totalPrice: cart.totalPrice,
    cartItems: cart.cart,
    user: user.user,
  }),
);
