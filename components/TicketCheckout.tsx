import { Button } from "@/components/ui/button";

function TicketInfo() {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="text-md">Total for 0 tickets</div>
      <div className="text-xl font-bold">0 CZK</div>
    </div>
  );
}

export default function TicketCheckout() {
  return (
    <div className="white_bg flex flex-row items-center justify-between gap-2 rounded-md px-2 py-4 md:px-3 md:py-5">
      <TicketInfo />
      <Button variant="default" className="md:text-xl">
        Checkout
      </Button>
    </div>
  );
}
