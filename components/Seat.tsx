"use client";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import { useMemo } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type SeatProps = {
  id: string;
  place: number;
  seatRow: number;
  price: number;
  ticketTypeName: string;
};

export default function Seat({
  id,
  place,
  seatRow,
  price,
  ticketTypeName,
}: SeatProps) {
  const dispatch = useDispatch();
  const { cart: cartItems } = useSelector((state: RootState) => state.cart);
  const isSelected = useMemo(
    () => cartItems.some((item) => item.id === id),
    [cartItems, id],
  );

  const handleSeatClick = () => {
    if (ticketTypeName !== "Empty") {
      const seat = { id, name: ticketTypeName, price };
      const action = isSelected ? removeFromCart({ id }) : addToCart(seat);
      dispatch(action);
    }
  };

  const seatContent = (
    <div
      onClick={ticketTypeName !== "Empty" ? handleSeatClick : undefined}
      className={`z-0 flex h-10 w-10 items-center justify-center rounded-full ${
        ticketTypeName === "Empty"
          ? "bg-black text-white"
          : isSelected
            ? "cursor-pointer border-2 border-black bg-zinc-200"
            : "cursor-pointer bg-zinc-100 hover:bg-zinc-200"
      }`}
    >
      <span className="text-sm font-medium">{place}</span>
    </div>
  );

  return ticketTypeName !== "Empty" ? (
    <HoverCard>
      <HoverCardTrigger asChild>{seatContent}</HoverCardTrigger>
      <HoverCardContent className="space-y-2 p-4 text-left text-sm">
        <div>
          <h4 className="font-semibold">Ticket: {ticketTypeName}</h4>
          <p>Row: {seatRow}</p>
          <p>Place: {place}</p>
          <p>Price: {price} CZK</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ) : (
    seatContent
  );
}
