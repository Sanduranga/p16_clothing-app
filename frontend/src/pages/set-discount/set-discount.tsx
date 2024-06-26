import React from "react";
import Navbar from "../../layouts/nav-bar";
import SetDiscountForm from "./sub-components";
import { LoginPage } from "../log-in";

export const SetDiscount: React.FC = () => {
  return (
    <>
      <Navbar />
      <SetDiscountForm />
      <LoginPage />
    </>
  );
};
