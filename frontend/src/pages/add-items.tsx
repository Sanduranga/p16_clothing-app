import React from "react";
import AddFormItems from "../components/add-items-form";
import Navbar from "../layers/nav-bar";
import Login from "./login";

const AddItems: React.FC = () => {
  return (
    <>
      <Navbar />
      <AddFormItems />
      <Login />
    </>
  );
};

export default AddItems;