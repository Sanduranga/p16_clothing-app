import React from "react";
import { Badge, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { useGetOneItemQuery } from "../redux/rtkApi";

const ItemDescription: React.FC = () => {
  const { data } = useGetOneItemQuery("3");
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Product",
      children: data?.itemTitle,
    },
    {
      key: "2",
      label: "Type",
      children: data?.itemType,
    },
    {
      key: "3",
      label: "Color",
      children: data?.itemColor,
    },
    {
      key: "4",
      label: "Size",
      children: data?.itemSize,
    },
    {
      key: "5",
      label: "Material",
      children: data?.materialName,
    },
    {
      key: "6",
      label: "Status",
      children: <Badge status="success" text="In store" />,
    },
    {
      key: "7",
      label: "Amount",
      children: data?.sellingPrice,
    },
    {
      key: "8",
      label: "Discount",
      children: "24%",
    },
    {
      key: "9",
      label: "Deatails",
      children: data?.description,
    },
  ];

  return (
    <Descriptions
      title="Description"
      layout="horizontal"
      column={1}
      bordered
      items={items}
    />
  );
};

export default ItemDescription;
