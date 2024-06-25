import React, { Suspense } from "react";
import Navbar from "../layouts/nav-bar";
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
