"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "@/lib/selectors";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import { useMemo } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import formatCurrency from "@/lib/currencyUtils";
import { Ticket } from "@/lib/types";
import useEvent from "@/hooks/useEvent";

export default function Seat({
  id,
  place,
  row,
  price,
  name,
  ticketTypeId,
  seatId,
}: Ticket) {
  const ticket = {
    id,
    price,
    name,
    place,
    row,
    ticketTypeId,
    seatId,
  };
  const { currencyIso } = useEvent();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isSelected = useMemo(
    () => cartItems.some((item) => item.id === id),
    [cartItems, id],
  );

  const handleSeatClick = () => {
    const action = isSelected ? removeFromCart({ id }) : addToCart(ticket);
    dispatch(action);
  };

  const seatContent = (
    <div
      onClick={name !== "Taken" ? handleSeatClick : undefined}
      className={`z-0 flex h-10 w-10 items-center justify-center rounded-full ${
        name === "Taken"
          ? "bg-black text-white"
          : name === "VIP ticket"
            ? isSelected
              ? "cursor-pointer border-2 border-black bg-yellow-400"
              : "cursor-pointer bg-yellow-200 hover:bg-yellow-300"
            : isSelected
              ? "cursor-pointer border-2 border-black bg-zinc-200"
              : "cursor-pointer bg-zinc-100 hover:bg-zinc-200"
      }`}
    >
      <span className="text-sm font-medium">{place}</span>
    </div>
  );

  return name !== "Taken" ? (
    <HoverCard>
      <HoverCardTrigger asChild>{seatContent}</HoverCardTrigger>
      <HoverCardContent className="space-y-2 p-4 text-left text-sm">
        <div>
          <h4 className="font-semibold">Ticket: {name}</h4>
          <p>Row: {row}</p>
          <p>Place: {place}</p>
          <p>Price: {formatCurrency(price, currencyIso)}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ) : (
    seatContent
  );
}
