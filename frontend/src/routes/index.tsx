import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { HomePage } from "../pages/home";
import { AddItemsPage } from "../pages/add-item-section";
import ClickedItemPage from "../pages/clicked-item";
import { SetDiscountPage } from "../pages/set-discount";
import { MyStorePage } from "../pages/my-store";
import { SaleItemsPage } from "../pages/sale-section";
import { StockClearingItemsPage } from "../pages/stock-clear-section";

export const router = [
  {
    elements: (
      <Suspense>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add-items",
        element: <AddItemsPage />,
      },
      {
        path: "/clicked-item/:code",
        element: <ClickedItemPage />,
      },
      {
        path: "/set-discount/:code",
        element: <SetDiscountPage />,
      },
      {
        path: "/my-store",
        element: <MyStorePage />,
      },
      {
        path: "/sale",
        element: <SaleItemsPage />,
      },
      {
        path: "/stock-clearing",
        element: <StockClearingItemsPage />,
      },
    ],
  },
];