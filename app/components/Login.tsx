"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
        <Button
          variant="default"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="text-2xl"
        >
          Login
        </Button>
      )}
    </div>
  );
}
