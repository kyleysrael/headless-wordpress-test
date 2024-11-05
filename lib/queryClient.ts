import { QueryClient } from "@tanstack/react-query";

const handleError = (error: Error) => {
  console.error("Global error handler:", error);
  alert(`An error occurred: ${error.message}`);
};

// Create a new QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      refetchOnWindowFocus: false, // Disable refetching when window is focused
      retry: 2 // Retry failed requests up to 2 times
    },
    mutations: {
      retry: 1, // Retry failed mutations once
      onError: handleError
    }
  }
});
