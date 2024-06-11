import { UseFormRegister, FieldErrors } from "react-hook-form";
import { GuestCheckoutFormInputs } from "@/lib/validationSchemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type GuestFormFieldsProps = {
  register: UseFormRegister<GuestCheckoutFormInputs>;
  errors: FieldErrors<GuestCheckoutFormInputs>;
};

export default function GuestFormFields({
  register,
  errors,
}: GuestFormFieldsProps) {
  return (
    <>
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
        <Label htmlFor="firstName" className="text-right">
          First Name
        </Label>
        <Input
          id="firstName"
          className="col-span-3"
          type="text"
          {...register("firstName")}
          required
        />
        {errors.firstName && (
          <p className="col-span-4 text-red-600">{errors.firstName?.message}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4 border-b border-gray-200 pb-10">
        <Label htmlFor="lastName" className="text-right">
          Last Name
        </Label>
        <Input
          id="lastName"
          className="col-span-3"
          type="text"
          {...register("lastName")}
          required
        />
        {errors.lastName && (
          <p className="col-span-4 text-red-600">{errors.lastName?.message}</p>
        )}
      </div>
    </>
  );
}
