import { useSelector } from "react-redux";
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
import { RootState } from "@/store/store";
import useEvent from "@/hooks/useEvent";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { clearCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

export default function CheckoutDialog() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { orderMutation } = useOrder(
    (res) => {
      toast({
        title: res,
      });
      setIsOpen(false);
      dispatch(clearCart());
    },
    (err) => {
      toast({
        title: err,
      });
    },
  );
  const {
    eventQuery: { data: event },
  } = useEvent();

  const totalItems = useSelector((state: RootState) => state.cart.totalAmount);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const user = useSelector((state: RootState) => state.user.user);

  const handlePlaceOrder = () => {
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
  };

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
        <div className="grid gap-4 py-4">
          <div className="text-md">Total for {totalItems} tickets</div>
          <div className="text-xl font-bold">
            {totalPrice} {event?.currencyIso ?? ""}
          </div>
          <DialogFooter>
            <Button onClick={handlePlaceOrder}>Place order</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
