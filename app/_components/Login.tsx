"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <div>
      {isLoggedIn ? (
        <div className="flex flex-row items-center justify-center gap-4 text-2xl">
          ondra janko
          <Avatar>
            <AvatarImage
              src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              alt="user avatar image"
            />
            <AvatarFallback>avatar</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="md:text-xl">
              Login
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Login into your profile</DialogTitle>
              <DialogDescription>
                Once you log in, you&apos;ll be able to proceed with checking
                out your order.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Email" className="text-right">
                  Email
                </Label>
                <Input
                  id="Email"
                  defaultValue=""
                  className="col-span-3"
                  type="email"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Password" className="text-right">
                  Password
                </Label>
                <Input
                  id="Password"
                  defaultValue=""
                  className="col-span-3"
                  type="password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Login</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
