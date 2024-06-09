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
    const seat = { id, name: ticketTypeName, price };
    const action = isSelected ? removeFromCart({ id }) : addToCart(seat);
    dispatch(action);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          onClick={handleSeatClick}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${isSelected ? "border-2 border-black bg-zinc-100" : "bg-zinc-100 hover:bg-zinc-200"} `}
        >
          <span className="text-sm font-medium text-black">
            {seatRow + ";" + place}
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="space-y-2 p-4 text-left text-sm">
        <div>
          <h4 className="font-semibold">Ticket: {ticketTypeName}</h4>
          <p>Row: {seatRow}</p>
          <p>Place: {place}</p>
          <p>Price: {price} CZK</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
