import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { homeRoutes } from "../features/home/routes";
import { productsRoutes } from "../features/products/routes";
import { authRoutes } from "../features/auth/routes";
import { AppContainer } from "../shared/layout/app-container";
import { lazy } from "react";
import { DefaultLayout } from "../shared/layout/default-layout";
import { cartRoutes } from "../features/cart/routes";
import { saleTodayRoutes } from "../features/sale-today's/routes";
import {checkOutRoutes} from "../features/check-out/routes";
import {detailsProductRoutes} from "../features/details-product/routes"
import {saleCategoryRoutes} from "../features/sale-category/routes"
import {newArrivalRoutes} from "../features/new-arrival/routes"
import {aboutRoutes} from "../features/about/routes"

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

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
