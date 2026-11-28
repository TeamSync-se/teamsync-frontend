"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

type MeetingsQueryProviderProps = {
  children: ReactNode;
};

/** Provider dùng chung một QueryClient cho toàn bộ route con của phân hệ cuộc họp. */
export function MeetingsQueryProvider({
  children,
}: MeetingsQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 30_000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
