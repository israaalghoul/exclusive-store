import { lazy } from "react"

const CartPage = lazy(() => import('../pages'));

export const cartRoutes = [
    {
        path: "/cart-products",
        element: (
                <CartPage />
        ),
    },
]