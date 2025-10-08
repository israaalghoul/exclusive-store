import { lazy } from 'react'

const SaleCategoryPage = lazy(() => import('../pages'))

export const saleCategoryRoutes = [
    {
        path: "/sale-category", 
        element: 
                <SaleCategoryPage />
    },
]