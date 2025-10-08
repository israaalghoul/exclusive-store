import { lazy } from 'react'
// import { DefaultLayout } from '../../../shared/layout/default-layout'

const BestSalePage = lazy(() => import('../pages'))

export const BestSaleRoutes = [
    {
        path: "/best-sale",
        element: 
                <BestSalePage />
  
    },
]