import { lazy } from 'react'
// import { DefaultLayout } from '../../../shared/layout/default-layout'

const CategoryPage = lazy(() => import('../pages'))
const CategoryDetail = lazy(() => import('../pages/category-detail'))

export const CategoryRoutes = [
    {
        path: "/category",
        element: 
                <CategoryPage />

    },
    {
      path: "/categories/:id",
      element: <CategoryDetail />,
    },
]