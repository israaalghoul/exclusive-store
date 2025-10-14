import { lazy } from 'react'
// import { DefaultLayout } from '../../../shared/layout/default-layout'

const CategoryPage = lazy(() => import('../pages'))
const CategoryDetail = lazy(() => import('../pages/category-detail'))

export const categoryRoutes = [
    {
        path: "/category",
        element: 
                <CategoryPage />

    },
    {
      path: "/categories/:categoryId",
      element: <CategoryDetail />,
    },
]