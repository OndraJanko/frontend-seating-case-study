import { Ticket, Event } from "@/lib/types";
import formatCurrency from "@/lib/currencyUtils";

type TicketSummary = {
  [key: string]: { name: string; count: number; totalCost: number };
};
type TicketSummaryProps = {
  cartItems: Ticket[];
  event?: Event;
  ticketSummary: TicketSummary;
  totalPrice: number;
};
export default function OrderSummary({
  cartItems,
  event,
  ticketSummary,
  totalPrice,
}: TicketSummaryProps) {
  return (
    <>
      <div className="text-md mb-5 border-b border-gray-200 pb-2">
        {cartItems.length === 0
          ? "No tickets in your cart"
          : Object.values(ticketSummary).map((ticket) => (
              <div key={ticket.name}>
                {ticket.count}x {ticket.name} -{" "}
                {formatCurrency(ticket.totalCost, event?.currencyIso ?? "")}
              </div>
            ))}
      </div>
      <div className="text-xl font-bold">
        {formatCurrency(totalPrice, event?.currencyIso ?? "")}
      </div>
    </>
  );
}
