import { lazy } from "react";
// import { DefaultLayout } from '../../../shared/layout/default-layout'
// const HomePage = lazy(() => import('../pages'))
const SalePage = lazy(() => import("../../sale/pages"));
const SaleTodayPage = lazy(() => import("../../sale-today's/pages"));
const CategoryPage = lazy(() => import("../../category/pages"));
const BestSalePage = lazy(() => import("../../best-sale/pages"));
const ExploreProductsPage = lazy(() => import("../../explore-products/pages"));
const SaleCategoryPage = lazy(() => import("../../sale-category/pages"));
const NewArrivalPage = lazy(() => import("../../new-arrival/pages"));
const DeliveryPage = lazy(() => import("../../delivery-section"));

export const homeRoutes = [
  {
    path: "/",
    element: (
      <>
        {/* <HomePage /> */}
        <SalePage />
        <SaleTodayPage />
        <CategoryPage />
        <BestSalePage />
        <SaleCategoryPage />
        <ExploreProductsPage />
        <NewArrivalPage />
        <DeliveryPage />
      </>
    ),
  },
];
