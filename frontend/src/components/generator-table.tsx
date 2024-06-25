import { Table, TableProps, Tag, Typography } from "antd";
import { fetchedAllDataArray } from "./stock-generator";

const GeneratorTable = ({
  tableData,
}: {
  tableData: fetchedAllDataArray[];
}) => {
  const { Text } = Typography;

  const columns: TableProps<fetchedAllDataArray>["columns"] = [
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
            status === "sale"
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
      render: (_, { buyingPrice, sellingPrice, sellerName }) =>
        sellerName === "entgraItems" ? sellingPrice : buyingPrice,
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
          ) : status === "sale" ? (
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
      render: (_, { salePrice, sellingPrice, stockClearingPrice }) =>
        salePrice
          ? salePrice
          : stockClearingPrice
          ? stockClearingPrice
          : sellingPrice,
    },
  ];
  return <Table columns={columns} dataSource={tableData} />;
};

export default GeneratorTable;
