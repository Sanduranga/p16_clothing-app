import React from "react";
import AddFormItems from "../components/add-items-form";
import Navbar from "../layouts/nav-bar";
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
