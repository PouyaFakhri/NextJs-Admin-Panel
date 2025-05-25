import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "../context/AuthProvider";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
