import { lazy } from "react";
const TopSale = lazy(() => import("../components/top-sale"));
const BestSale = lazy(() => import("../components/best-sale"));
const CategoryPage = lazy(() => import("../../category/pages"));
const SaleToday = lazy(() => import("../components/sale-today"));
const NewArrival = lazy(() => import("../components/new-arrival"));
const SaleCategory = lazy(() => import("../components/sale-category"));
const ExploreProducts = lazy(() => import("../components/explore-products"));
const ServiceFeatures = lazy(() => import("../components/service-features"));

export const homeRoutes = [
  {
    path: "/",
    element: (
      <>
        <TopSale />
        <SaleToday />
        <CategoryPage />
        <BestSale />
        <SaleCategory />
        <ExploreProducts />
        <NewArrival />
        <ServiceFeatures />
        
      </>
    ),
  },
];
