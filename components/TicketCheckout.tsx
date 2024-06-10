"use client";
import { useSelector } from "react-redux";
import useEvent from "@/hooks/useEvent";
import TicketCheckoutSkeleton from "@/components/skeletons/TicketCheckoutSkeleton";
import CheckoutDialog from "./dialogs/CheckoutDialog";
import GuestCheckoutDialog from "./dialogs/GuestCheckoutDialog";

import {
  selectTotalItems,
  selectTotalPrice,
  selectIsLoggedIn,
} from "@/lib/selectors";
import formatCurrency from "@/lib/currencyUtils";

function TicketInfo() {
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  const { currencyIso } = useEvent();

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="text-md">Total for {totalItems} tickets</div>
      <div className="text-xl font-bold">
        {formatCurrency(totalPrice, currencyIso)}
      </div>
    </div>
  );
}

export default function TicketCheckout() {
  const {
    eventQuery: { isLoading },
  } = useEvent();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoading) {
    return <TicketCheckoutSkeleton />;
  }

  return (
    <div className="white_bg flex flex-row items-center justify-between gap-2 rounded-md px-4 py-4 md:px-9 md:py-5">
      <TicketInfo />
      {isLoggedIn ? <CheckoutDialog /> : <GuestCheckoutDialog />}
    </div>
  );
}
