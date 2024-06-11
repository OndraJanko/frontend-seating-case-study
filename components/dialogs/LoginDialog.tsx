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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormInputs, loginSchema } from "@/lib/validationSchemas";
import useAuth from "@/hooks/useAuth";
import { useCallback, useState } from "react";
import CheckoutDialog from "./CheckoutDialog";

type LoginDialogProps = {
  isGuestCheckout?: boolean;
  disabled?: boolean;
};
export default function LoginDialog({
  isGuestCheckout = false,
  disabled = false,
}: LoginDialogProps) {
  const { loginMutation, loginError, resetLoginError } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data);
  };

  const handleDialogClose = useCallback(
    (open: boolean) => {
      if (!open) {
        reset();
        resetLoginError();
        setIsOpen(false);
      }
    },
    [reset, resetLoginError],
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          disabled={disabled}
          aria-label={isGuestCheckout ? "Checkout" : "Login"}
          onClick={() => setIsOpen(true)}
        >
          {isGuestCheckout ? "Checkout" : "Login"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login into your profile</DialogTitle>
          <DialogDescription>
            Once you log in, you&apos;ll be able to proceed with checking out
            your order.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
          aria-live="polite"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              type="email"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && (
              <p className="col-span-4 text-end text-sm text-red-600">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              className="col-span-3"
              type="password"
              {...register("password")}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="col-span-4 text-end text-sm text-red-600">
                {errors.password?.message}
              </p>
            )}
            {loginError && (
              <p
                className="col-span-4 text-end text-sm text-red-600"
                role="alert"
              >
                {loginError}
              </p>
            )}
          </div>
          <DialogFooter>
            <div className="flex flex-row items-center justify-end gap-2">
              {isGuestCheckout && (
                <CheckoutDialog
                  isGuestCheckout={isGuestCheckout}
                  disabled={loginMutation.isPending}
                  onClose={() => {
                    setIsOpen(false);
                    reset();
                    resetLoginError();
                  }}
                />
              )}
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                aria-label="Login"
              >
                {loginMutation.isPending ? "Processing..." : "Login"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
