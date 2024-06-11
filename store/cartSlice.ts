import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ticket } from "@/lib/types";

type CartState = {
  cart: Ticket[];
  totalAmount: number;
  totalPrice: number;
};

const initialState: CartState = {
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Ticket>) => {
      state.cart.push(action.payload);
      state.totalAmount += 1;
      state.totalPrice += action.payload.price;
      state.cart.sort((a, b) => a.row - b.row || a.place - b.place);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.totalPrice -= state.cart[index].price;
        state.cart.splice(index, 1);
        state.totalAmount -= 1;
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
