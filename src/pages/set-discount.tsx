import React from "react";
import Navbar from "../components/nav-bar";
import Login from "./login";
import SetDiscountForm from "../components/setDiscountForm";

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
