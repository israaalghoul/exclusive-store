import { lazy } from "react";
import { cartRoutes } from "../features/cart/routes";
import { homeRoutes } from "../features/home/routes";
import { authRoutes } from "../features/auth/routes";
import { aboutRoutes } from "../features/about/routes";
import { contactRoutes } from "../features/contact/routes";
import { wishListRoutes } from "../features/wishlist/routes";
import { productsRoutes } from "../features/products/routes";
import { checkOutRoutes } from "../features/check-out/routes";
import { DefaultLayout } from "../shared/layout/default-layout";
import { saleTodayRoutes } from "../features/sale-today's/routes";
import { newArrivalRoutes } from "../features/new-arrival/routes";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router";
import { saleCategoryRoutes } from "../features/sale-category/routes";
import { detailsProductRoutes } from "../features/details-product/routes";

const NotFoundPage = lazy(() => import("../shared/pages/not-found-page"));

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      ...homeRoutes,
      ...productsRoutes,
      ...authRoutes,
      ...cartRoutes,
      ...saleTodayRoutes,
      ...checkOutRoutes,
      ...detailsProductRoutes,
      ...saleCategoryRoutes,
      ...newArrivalRoutes,
      ...aboutRoutes,
      ...contactRoutes,
      ...wishListRoutes,

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createHashRouter(routes);

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
