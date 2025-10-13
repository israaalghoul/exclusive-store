import { lazy } from 'react'
// import { DefaultLayout } from '../../../shared/layout/default-layout'
import { AuthPageGuard } from '../../auth/guards/auth-guard'
import { appRoutes } from '../../../routes'

const ProductsPage = lazy(() => import('../pages'))


export const productsRoutes = [
  {
    path: appRoutes.products.all, 
    element:

        <ProductsPage />

 
  },

]