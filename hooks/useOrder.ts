import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { OrderResponse, OrderRequest } from "@/lib/types";

export default function useOrder(
  onSuccessCallback: (response: string) => void,
  onErrorCallback: (error: string) => void,
) {
  const queryClient = useQueryClient();

  async function createOrder(
    data: OrderRequest,
  ): Promise<AxiosResponse<OrderResponse>> {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("API_URL is not set");
    }
    return axios.post<OrderResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/order`,
      data,
    );
  }

  const orderMutation: UseMutationResult<
    AxiosResponse<OrderResponse>,
    unknown,
    OrderRequest
  > = useMutation({
    mutationFn: createOrder,
    onSuccess: (response) => {
      onSuccessCallback(response.data.message);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        onErrorCallback(error.response.data.message);
      } else {
        onErrorCallback("Unknown error, try again later");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
      queryClient.invalidateQueries({ queryKey: ["seats"] });
    },
  });

  return { orderMutation };
}
