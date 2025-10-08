import { lazy } from "react"
import { appRoutes } from "../../../routes";

const DetailsProductPage = lazy(() => import('../pages'));

export const detailsProductRoutes = [
    {
        path: appRoutes.detailsProduct,
        element: (
                <DetailsProductPage />
        ),
    },
]