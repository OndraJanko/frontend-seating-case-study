import { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  guestCheckoutSchema,
  GuestCheckoutFormInputs,
} from "@/lib/validationSchemas";
import GuestFormFields from "../GuestFormFields";
import OrderSummary from "../OrderSummary";

type TicketSummary = {
  [key: string]: { name: string; count: number; totalCost: number };
};

type CheckoutDialogProps = {
  isGuestCheckout?: boolean;
  disabled?: boolean;
};

export default function CheckoutDialog({
  isGuestCheckout = false,
  disabled = false,
}: CheckoutDialogProps) {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GuestCheckoutFormInputs>({
    resolver: zodResolver(guestCheckoutSchema),
  });
  const handlePlaceOrder = useCallback(
    (formInputData: GuestCheckoutFormInputs) => {
      if (!event || cartItems.length === 0 || (!isGuestCheckout && !user))
        return;
      const orderData = {
        eventId: event.eventId,
        tickets: cartItems.map((item) => ({
          ticketTypeId: item.ticketTypeId,
          seatId: item.seatId,
        })),
        user: isGuestCheckout
          ? {
              email: formInputData.email,
              firstName: formInputData.firstName,
              lastName: formInputData.lastName,
            }
          : {
              email: user?.email ?? "",
              firstName: user?.firstName ?? "",
              lastName: user?.lastName ?? "",
            },
      };
      orderMutation.mutate(orderData);
    },
    [event, user, cartItems, orderMutation, isGuestCheckout],
  );
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

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      reset();
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={() => setIsOpen(true)}
          disabled={disabled}
        >
          {isGuestCheckout ? "Continue as guest" : "Checkout"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Checkout summary</DialogTitle>
          <DialogDescription>
            Here you can see your cart and place the order.
          </DialogDescription>
        </DialogHeader>
        {isGuestCheckout ? (
          <form
            onSubmit={handleSubmit(handlePlaceOrder)}
            className="grid gap-4 py-4"
            aria-live="polite"
          >
            <GuestFormFields register={register} errors={errors} />
            <OrderSummary
              cartItems={cartItems}
              ticketSummary={ticketSummary}
              event={event}
              totalPrice={totalPrice}
            />
            <DialogFooter>
              <Button type="submit" disabled={orderMutation.isPending}>
                {orderMutation.isPending ? "Processing..." : "Place order"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="flex flex-col gap-6 py-4">
            <OrderSummary
              cartItems={cartItems}
              ticketSummary={ticketSummary}
              event={event}
              totalPrice={totalPrice}
            />
            <DialogFooter>
              <Button
                onClick={() =>
                  handlePlaceOrder({ email: "", firstName: "", lastName: "" })
                }
                disabled={orderMutation.isPending}
              >
                {orderMutation.isPending ? "Processing..." : "Place order"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
