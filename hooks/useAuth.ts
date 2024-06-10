import { useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/userSlice";
import { LoginResponse } from "@/lib/types";
import { LoginFormInputs } from "@/lib/validationSchemas";
import axios, { AxiosResponse } from "axios";

export default function useAuth() {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string | null>(null);

  async function fetchUser(
    data: LoginFormInputs,
  ): Promise<AxiosResponse<LoginResponse>> {
    return axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      data,
    );
  }
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
    },
  });

  function handleLogout() {
    dispatch(clearUser());
  }

  function resetLoginError() {
    setLoginError(null);
  }

  return { loginMutation, handleLogout, loginError, resetLoginError };
}
