"use client";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnMount: false, // Prevents refetching on mount to avoid double fetching
        refetchOnWindowFocus: false, // Prevents refetching on window focus
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

type QueryProviderProps = {
  children: ReactNode;
};

export default function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

/*
  Approach for Handling Double Fetch Issue:
  - refetchOnMount is set to false to prevent double fetching due to hydration of the client.
  - The API for seats provides random results, which complicates consistent data handling.
  - As a tradeoff, the user won't get actual data from refreshing the page until an order is placed,
    either successfully or with an error. This ensures data consistency without redundant API calls.
*/
