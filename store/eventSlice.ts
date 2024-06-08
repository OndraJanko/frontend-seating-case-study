import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "@/lib/types";

type EventState = {
  event: Event | null;
};

const initialState: EventState = {
  event: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvent: (state, action: PayloadAction<Event>) => {
      state.event = action.payload;
    },
    clearEvent: (state) => {
      state.event = null;
    },
  },
});

export const { setEvent, clearEvent } = eventSlice.actions;
export default eventSlice.reducer;
