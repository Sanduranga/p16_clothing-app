import React, { Suspense } from "react";
import Navbar from "../layers/nav-bar";
import Login from "./login";
import StockGenerator from "../components/stock-generator";

const MyStore: React.FC = () => {
  return (
    <Suspense fallback={"loading"}>
      <Navbar />
      <Login />
      <StockGenerator />
    </Suspense>
  );
};

export default MyStore;
