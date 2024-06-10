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

type SeatProps = {
  id: string;
  place: number;
  seatRow: number;
  price: number;
  ticketTypeName: string;
  currencyIso: string;
  ticketTypeId: string;
  seatId: string;
};

export default function Seat({
  id,
  place,
  seatRow,
  price,
  ticketTypeName,
  currencyIso,
  ticketTypeId,
  seatId,
}: SeatProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isSelected = useMemo(
    () => cartItems.some((item) => item.id === id),
    [cartItems, id],
  );

  const handleSeatClick = () => {
    const seat = { id, ticketTypeId, seatId, price, name: ticketTypeName };
    const action = isSelected ? removeFromCart({ id }) : addToCart(seat);
    dispatch(action);
  };

  const seatContent = (
    <div
      onClick={ticketTypeName !== "Taken" ? handleSeatClick : undefined}
      className={`z-0 flex h-10 w-10 items-center justify-center rounded-full ${
        ticketTypeName === "Taken"
          ? "bg-black text-white"
          : ticketTypeName === "VIP ticket"
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

  return ticketTypeName !== "Taken" ? (
    <HoverCard>
      <HoverCardTrigger asChild>{seatContent}</HoverCardTrigger>
      <HoverCardContent className="space-y-2 p-4 text-left text-sm">
        <div>
          <h4 className="font-semibold">Ticket: {ticketTypeName}</h4>
          <p>Row: {seatRow}</p>
          <p>Place: {place}</p>
          <p>
            Price: {price} {currencyIso}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ) : (
    seatContent
  );
}
