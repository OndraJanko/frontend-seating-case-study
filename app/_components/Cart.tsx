"use client";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[300px] w-80 overflow-auto">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Cart</h4>
            <p className="text-sm text-muted-foreground">
              Here you can see your order.
            </p>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex w-full items-end justify-between gap-4">
                <Label>{item.name}</Label>
                <Label>{item.price} CZK</Label>
              </div>
              <Button
                size="sm"
                className="h-2 w-2 p-3"
                onClick={() => handleRemoveFromCart(item.id)}
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
