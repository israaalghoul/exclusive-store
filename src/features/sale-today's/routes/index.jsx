import { lazy } from 'react'
// import { DefaultLayout } from '../../../shared/layout/default-layout'
import {appRoutes} from "../../../routes/index"
const SaleTodayPage = lazy(() => import('../pages'))

export const saleTodayRoutes = [
    {
        path: appRoutes.saleToday.list,
        element: 
                <SaleTodayPage />
    },
]