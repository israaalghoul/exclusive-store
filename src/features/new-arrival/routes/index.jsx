import { lazy } from 'react'

const NewArrivalPage = lazy(() => import('../pages'))

export const newArrivalRoutes = [
    {
        path: "/new-arrival", 
        element: 
                <NewArrivalPage />
    },
]