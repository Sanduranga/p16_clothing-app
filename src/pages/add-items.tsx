import React from "react";
import AddFormItems from "../components/add-items-form";
import Navbar from "../components/nav-bar";

const AddItems: React.FC = () => {
  return (
    <>
      <Navbar />
      <AddFormItems />
    </>
  );
};

export default AddItems;
