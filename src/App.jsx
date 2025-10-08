import { ToastContainer } from "react-toastify"
import { AppRouterProvider } from "./routes/provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CartProvider } from "../src/features/products/store/cart.jsx";

function App() {
  const queryClient =  new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
      <AppRouterProvider />
      <ToastContainer />
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
