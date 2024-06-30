import { Table, TableProps, Tag, Typography } from "antd";
import { NormalStoreTypes } from "../../../types/types";

const GeneratorTable = ({ tableData }: { tableData: NormalStoreTypes[] }) => {
  const { Text } = Typography;

  const columns: TableProps<NormalStoreTypes>["columns"] = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Seller name",
      dataIndex: "sellerName",
      key: "seller name",
    },
    {
      title: "Item type",
      dataIndex: "itemType",
      key: "item type",
    },
    {
      title: "Quantity",
      dataIndex: "numberOfItems",
      key: "quantity",
    },
    {
      title: "Color",
      dataIndex: "itemColor",
      key: "color",
    },
    {
      title: "Size",
      dataIndex: "itemSize",
      key: "size",
      render: (_, { itemSize }) => (
        <Tag color="blue">{itemSize.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Tag
          color={`${
            status === "saleStore"
              ? "yellow"
              : status === "normalStore"
              ? "green"
              : "red"
          }`}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Buying/Starting price",
      dataIndex: "buyingPrice",
      render: (_, { buyingPrice, startingPrice }) =>
        `${buyingPrice}/${startingPrice}`,
    },
    {
      title: "Percentage",
      key: "percentage",
      render: (_, { profitPercentage, salePercentage, status }) => (
        <>
          {status === "normalStore" ? (
            <>
              <Text type="success">(+{profitPercentage}%)</Text>
            </>
          ) : status === "saleStore" ? (
            <Text type="warning">(-{salePercentage}%)</Text>
          ) : (
            <Text type="danger">-</Text>
          )}
        </>
      ),
    },
    {
      title: "Display price",
      key: "selling price",
      render: (_, { salePrice, startingPrice, stockClearingPrice }) =>
        salePrice
          ? salePrice
          : stockClearingPrice
          ? stockClearingPrice
          : startingPrice,
    },
  ];
  return <Table columns={columns} dataSource={tableData} />;
};

export default GeneratorTable;
