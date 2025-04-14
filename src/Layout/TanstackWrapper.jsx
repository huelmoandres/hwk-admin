"use client";
import { useState } from "react";
import { QueryClientProvider, Hydrate, QueryClient } from "@tanstack/react-query";
import SettingProvider from "@/Helper/SettingContext/SettingProvider";
import BadgeProvider from "@/Helper/BadgeContext/BadgeProvider";

const TanstackWrapper = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // No volver a obtener datos automáticamente
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            // Mantener los datos en caché indefinidamente
            staleTime: Number.POSITIVE_INFINITY,
            // No volver a obtener datos automáticamente cuando están obsoletos
            refetchInterval: false,
            // Mantener los datos en caché incluso cuando no hay componentes que los usen
            gcTime: Number.POSITIVE_INFINITY,
          },
        },
      }),
  )
  
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={children.dehydratedState}>
        <SettingProvider>
          <BadgeProvider>
            {children}
          </BadgeProvider>
        </SettingProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default TanstackWrapper;
