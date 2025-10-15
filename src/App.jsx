import { ToastContainer } from "react-toastify"
import { AppRouterProvider } from "./routes/provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CartStore } from "./features/cart/store/cart-store.jsx";
import { WishlistProvider } from "../src/features/wishlist/store/index.jsx";

function App() {
  const queryClient =  new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WishlistProvider>
      <CartStore>
      <AppRouterProvider />
      <ToastContainer />
      </CartStore>
      </WishlistProvider>
    </QueryClientProvider>
  )
}

export default App
