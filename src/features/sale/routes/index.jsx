import { lazy } from 'react'
// import { DefaultLayout } from '../../../shared/layout/default-layout'

const SalePage = lazy(() => import('../pages'))

export const SaleRoutes = [
    {
        path: "/sale", // Ex: my-app.com
        element: 
 
                <SalePage />
 

    },
]