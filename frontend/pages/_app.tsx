import { AuthProvider } from "@/components/general/auth-provider";
import { LoadingScreen } from "@/components/general/loader";
import ToasterContainer from "@/components/general/toaster-container";
import "@/styles/globals.css";
import "@/styles/loader.module.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoadingScreen />
        <ToasterContainer />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
