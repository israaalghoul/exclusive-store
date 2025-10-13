import { ToastContainer } from "react-toastify"
import { AppRouterProvider } from "./routes/provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CartProvider } from "../src/features/products/store/cart.jsx";
import { WishlistProvider } from "../src/features/wishlist/store/index.jsx";

function App() {
  const queryClient =  new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WishlistProvider>
      <CartProvider>
      <AppRouterProvider />
      <ToastContainer />
      </CartProvider>
      </WishlistProvider>
    </QueryClientProvider>
  )
}

export default App
