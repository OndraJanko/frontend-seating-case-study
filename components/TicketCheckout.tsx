"use client";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useEvent from "@/hooks/useEvent";
import TicketCheckoutSkeleton from "@/components/skeletons/TicketCheckoutSkeleton";

function TicketInfo() {
  const totalItems = useSelector((state: RootState) => state.cart.totalAmount);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const { currencyIso } = useEvent();

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="text-md">Total for {totalItems} tickets</div>
      <div className="text-xl font-bold">
        {totalPrice} {currencyIso}
      </div>
    </div>
  );
}

export default function TicketCheckout() {
  const {
    eventQuery: { isLoading },
  } = useEvent();

  if (isLoading) {
    return <TicketCheckoutSkeleton />;
  }

  return (
    <div className="white_bg flex flex-row items-center justify-between gap-2 rounded-md px-4 py-4 md:px-9 md:py-5">
      <TicketInfo />
      <Button variant="default" className="md:text-xl">
        Checkout
      </Button>
    </div>
  );
}
