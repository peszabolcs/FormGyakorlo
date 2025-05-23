import { QueryClient } from "@tanstack/react-query";

// Configure QueryClient with defaults for better error handling and parallel queries
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Enable by default
      retry: 1,
      // The time until we try to refetch when an error occurs
      retryDelay: 3000,
      // The time until we consider a query stale
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // The time until we stop caring about the query (renamed from cacheTime in v5)
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});
