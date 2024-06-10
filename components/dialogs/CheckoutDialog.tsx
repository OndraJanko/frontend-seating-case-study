import { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import useOrder from "@/hooks/useOrder";
import useEvent from "@/hooks/useEvent";
import { useToast } from "@/components/ui/use-toast";
import { clearCart } from "@/store/cartSlice";
import { selectCheckoutData } from "@/lib/selectors";

type TicketSummary = {
  [key: string]: { name: string; count: number; totalCost: number };
};

export default function CheckoutDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const { orderMutation } = useOrder(
    (res) => {
      toast({ title: res });
      setIsOpen(false);
      dispatch(clearCart());
    },
    (err) => {
      toast({ title: err });
    },
  );

  const { data: event } = useEvent().eventQuery;

  const { totalPrice, cartItems, user } = useSelector(selectCheckoutData);

  const handlePlaceOrder = useCallback(() => {
    if (!event || !user || cartItems.length === 0) return;
    const orderData = {
      eventId: event.eventId,
      tickets: cartItems.map((item) => ({
        ticketTypeId: item.ticketTypeId,
        seatId: item.seatId,
      })),
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
    orderMutation.mutate(orderData);
  }, [event, user, cartItems, orderMutation]);

  const ticketSummary: TicketSummary = useMemo(() => {
    return cartItems.reduce((summary, item) => {
      const { ticketTypeId, name, price } = item;
      if (!summary[ticketTypeId]) {
        summary[ticketTypeId] = { name: name, count: 0, totalCost: 0 };
      }
      summary[ticketTypeId].count += 1;
      summary[ticketTypeId].totalCost += price;
      return summary;
    }, {} as TicketSummary);
  }, [cartItems]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="md:text-xl">
          Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Checkout summary</DialogTitle>
          <DialogDescription>
            Here you can see your cart and place the order.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="text-md mb-5 border-b border-gray-200 pb-2">
            {cartItems.length === 0
              ? "No tickets in your cart"
              : Object.values(ticketSummary).map((ticket) => (
                  <div key={ticket.name}>
                    {ticket.count}x {ticket.name} - {ticket.totalCost}{" "}
                    {event?.currencyIso ?? ""}
                  </div>
                ))}
          </div>
          <div className="text-xl font-bold">
            {totalPrice} {event?.currencyIso ?? ""}
          </div>
          <DialogFooter>
            <Button
              onClick={handlePlaceOrder}
              disabled={orderMutation.isPending}
            >
              {orderMutation.isPending ? "Processing..." : "Place order"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
