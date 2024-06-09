"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoginDialog from "./LoginDialog";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { loadUserFromStorage } from "@/store/userSlice";

export default function Login() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.user);
  const { handleLogout } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const userProfilePictureUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div>
      {isLoggedIn && user ? (
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={userProfilePictureUrl}
                alt="user avatar image"
              />
              <AvatarFallback>avatar</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="max-h-[300px] w-80 max-w-[300px] overflow-auto">
            <h3 className="font-bold">User</h3>
            <p className="mb-3 text-sm">
              {user.firstName} {user.lastName}
            </p>
            <h3 className="font-bold">Email</h3>
            <p className="text-sm">{user.email}</p>
            <div className="flex items-center justify-end">
              <Button variant="default" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginDialog />
      )}
    </div>
  );
}
