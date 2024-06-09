import { useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/userSlice";
import { fetchUser } from "@/lib/fetchers";
import { LoginResponse } from "@/lib/types";
import { LoginFormInputs } from "@/lib/validationSchemas";
import axios, { AxiosResponse } from "axios";

export default function useAuth() {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string | null>(null);

  const loginMutation: UseMutationResult<
    AxiosResponse<LoginResponse>,
    unknown,
    LoginFormInputs
  > = useMutation({
    mutationFn: fetchUser,
    onSuccess: (response) => {
      setLoginError(null);
      dispatch(setUser(response.data.user));
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("Unknown error, try again later");
      }
      console.error("Login error:", error);
    },
  });

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const resetLoginError = () => {
    setLoginError(null);
  };

  return { loginMutation, handleLogout, loginError, resetLoginError };
}
