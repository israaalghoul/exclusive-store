import { lazy } from 'react'
// import { DefaultLayout } from '../../../shared/layout/default-layout'
import { AuthPageGuard } from '../../auth/guards/auth-guard'

const ProductsPage = lazy(() => import('../pages'))


export const productsRoutes = [
  {
    path: "/products", 
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