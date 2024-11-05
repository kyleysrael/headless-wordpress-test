"use client";

import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
