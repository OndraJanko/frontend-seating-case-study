"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "@/store/cartSlice";
import useEvent from "@/hooks/useEvent";
import { useEffect } from "react";
import { selectCartItems, selectIsCartEmpty } from "@/lib/selectors";
import formatCurrency from "@/lib/currencyUtils";

export default function Cart() {
  const cartItems = useSelector(selectCartItems);
  const isEmpty = useSelector(selectIsCartEmpty);
  const dispatch = useDispatch();
  const {
    currencyIso,
    seatsQuery: { data },
  } = useEvent();

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  // Clear the cart when the event seats data changes
  useEffect(() => {
    if (data) {
      dispatch(clearCart());
    }
  }, [data, dispatch]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="default"
          className="px-2"
          aria-label="Open Cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[300px] w-80 overflow-auto px-0 pt-0">
        <div className="sticky top-0 space-y-1 border-b border-gray-200 bg-white px-4 py-5">
          <h4 className="font-medium leading-none">Cart</h4>
          <p className="text-sm text-muted-foreground">
            Here you can see your order.
          </p>
        </div>
        <div className="grid gap-4 px-4 py-5">
          {isEmpty && (
            <div>
              Oops! Your cart is empty. Find an exciting event and add some
              tickets to your cart!
            </div>
          )}
          {!isEmpty &&
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex w-full items-end justify-between gap-4">
                  <Label>{item.name}</Label>
                  <Label>{formatCurrency(item.price, currencyIso)}</Label>
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="h-2 w-2 p-3"
                  onClick={() => handleRemoveFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  x
                </Button>
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
