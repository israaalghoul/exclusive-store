import { lazy } from 'react'
// import { DefaultLayout } from '../../../shared/layout/default-layout'
import { AuthPageGuard } from '../../auth/guards/auth-guard'

const ProductsPage = lazy(() => import('../pages'))
const ProductFormPage = lazy(() => import('../pages/form'))

export const productsRoutes = [
  {
    path: "/products", // Ex: my-app.com/products
    element:

        <ProductsPage />

 
  },
  {
    path: "/products/form", // Ex: my-app.com/products/form
    element: (
      <AuthPageGuard>
   
          <ProductFormPage />
   
      </AuthPageGuard>
    )
  },
]