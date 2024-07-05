import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider // here I use this antd `ConfigProvider` for making changes for antd components in globaly.
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
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
