import React from "react";
import Navbar from "../layers/nav-bar";
import Login from "./login";
import StockGenerator from "../components/stock-generator";

const MyStore: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Login />
      <StockGenerator />
    </div>
  );
};

export default MyStore;
