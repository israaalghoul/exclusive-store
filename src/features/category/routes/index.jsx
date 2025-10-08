import { lazy } from 'react'
// import { DefaultLayout } from '../../../shared/layout/default-layout'

const CategoryPage = lazy(() => import('../pages'))

export const CategoryRoutes = [
    {
        path: "/category",
        element: 
                <CategoryPage />

    },
]