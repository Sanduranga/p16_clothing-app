import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddItems from "./pages/add-items.tsx";
import ClickedItemPage from "./pages/clicked-item.tsx";
import { ConfigProvider } from "antd";
import SetDiscount from "./pages/set-discount.tsx";
import MyStore from "./pages/my-store.tsx";
import StockClearingItems from "./pages/stock-clear-section/stock-clearing.tsx";
import SaleItems from "./pages/sale-section/sale-items.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add-items",
    element: <AddItems />,
  },
  {
    path: "/clicked-item/:code",
    element: <ClickedItemPage />,
  },
  {
    path: "/set-discount/:code",
    element: <SetDiscount />,
  },
  {
    path: "/my-store",
    element: <MyStore />,
  },
  {
    path: "/sale",
    element: <SaleItems />,
  },
  {
    path: "/stock-clearing",
    element: <StockClearingItems />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 32,
            arrowOffset: 16,
            algorithm: true,
          },
          Badge: {
            statusSize: 12,
          },
        },
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
