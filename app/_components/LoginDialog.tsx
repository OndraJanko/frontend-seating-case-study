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

export default function LoginDialog() {
  const { loginMutation, loginError, resetLoginError } = useAuth();
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

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      reset();
      resetLoginError();
    }
  };

  return (
    <Dialog onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="default" className="md:text-xl">
          Login
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
              required
            />
            {errors.email && (
              <p className="col-span-4 text-red-600">{errors.email?.message}</p>
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
              required
            />
            {errors.password && (
              <p className="col-span-4 text-red-600">
                {errors.password?.message}
              </p>
            )}
            {loginError && (
              <p className="col-span-4 text-center text-red-600" role="alert">
                {loginError}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Login</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
