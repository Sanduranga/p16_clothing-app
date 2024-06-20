import React from "react";
import Navbar from "../layers/nav-bar";
import Login from "./login";
import SetDiscountForm from "../components/set-discount-form";

const SetDiscount: React.FC = () => {
  return (
    <>
      <Navbar />
      <SetDiscountForm />
      <Login />
    </>
  );
};

export default SetDiscount;
