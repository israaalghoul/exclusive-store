import { lazy } from 'react'
import {appRoutes} from "../../../routes/index"
const WishListPage = lazy(() => import('../pages'))

export const wishListRoutes = [
    {
        path: appRoutes.wishlist,
        element: (
                <WishListPage />
        )
    },
]
