"use client";
import { Button } from "@/components/ui/button";

function TicketInfo() {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="text-md">Total for [?] tickets</div>
      <div className="text-xl font-bold">[?] CZK</div>
    </div>
  );
}
export default function PriceFooter() {
  return (
    <footer className="flex h-[50px] w-full flex-row items-center justify-end gap-10 border-t-2 bg-white px-5 py-16 lg:px-32">
      <TicketInfo />
      <Button
        variant="default"
        className="md:text-2xl"
        onClick={() => {
          console.log("checkout");
        }}
      >
        Checkout
      </Button>
    </footer>
  );
}
