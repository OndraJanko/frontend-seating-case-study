"use client";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoginDialog from "../../components/dialogs/LoginDialog";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { loadUserFromStorage } from "@/store/userSlice";
import AvatarSkeleton from "@/components/skeletons/AvatarSkeleton";
import { selectIsLoggedIn, selectUser } from "@/lib/selectors";

export default function Login() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
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
                alt={`${user.firstName} ${user.lastName} profile picture`}
              />
              <AvatarFallback>
                <AvatarSkeleton aria-label="Loading avatar" />
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="max-h-[300px] w-80 max-w-[300px] overflow-auto">
            <h3 className="font-bold">User</h3>
            <p className="mb-3 text-sm">
              {user.firstName} {user.lastName}
            </p>
            <h3 className="font-bold">Email</h3>
            <p className="mb-4 text-sm">{user.email}</p>
            <div className="flex flex-row items-center justify-end gap-2">
              <div className="flex items-center justify-end">
                <Button variant="default" aria-label="Last Orders">
                  Last Orders
                </Button>
              </div>
              <div className="flex items-center justify-end">
                <Button
                  variant="default"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  Logout
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginDialog />
      )}
    </div>
  );
}
