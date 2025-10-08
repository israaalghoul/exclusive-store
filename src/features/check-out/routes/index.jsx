import { lazy } from "react"
import { appRoutes } from "../../../routes";

const CheckOutPage = lazy(() => import('../pages'));

export const checkOutRoutes = [
    {
        path: appRoutes.checkOut,
        element: (
                <CheckOutPage />
        ),
    },
]