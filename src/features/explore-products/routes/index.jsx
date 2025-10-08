import { lazy } from 'react'
// import { DefaultLayout } from '../../../shared/layout/default-layout'

const ExploreProductsPage = lazy(() => import('../pages'))

export const ExploreProductsRoutes = [
    {
        path: "/explore-products", 
        element: 
                <ExploreProductsPage />

    },
]