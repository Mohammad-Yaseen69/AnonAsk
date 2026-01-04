'use client'

import { Toaster } from "@/components/ui/sonner";
import AuthContextProvider from "@/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      }
    }
  }))

  return (
    <AuthContextProvider>
      <ThemeProvider
        defaultTheme="dark"
        enableSystem
        attribute={"class"}
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}