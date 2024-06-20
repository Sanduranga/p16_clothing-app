import { Table, TableProps, Tag, Typography } from "antd";
import { itemTypes2 } from "../types/types";

const GeneratorTable = ({
  tableData,
  refVal,
}: {
  tableData: itemTypes2[];
  refVal: string | null;
}) => {
  const { Text } = Typography;

  const columns: TableProps<itemTypes2>["columns"] = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <a>{text}</a>,
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
      title: refVal === "entgraItems" ? "Our price" : "Buying price",
      dataIndex: "buyingPrice",
      key: "buying price",
      render: (_, { buyingPrice, sellingPrice, sellerName }) =>
        sellerName === "entgraItems" ? sellingPrice : buyingPrice,
    },
    {
      title: "Percentage",
      //   dataIndex: "profitPercentage",
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
      //   dataIndex: "sellingPrice",
      key: "selling price",
      render: (_, { salePrice, sellingPrice, stockClearingPrice }) =>
        salePrice
          ? salePrice
          : stockClearingPrice
          ? stockClearingPrice
          : sellingPrice,
    },
    // {
    //   title: "Sale price",
    //   dataIndex: "salePrice",
    //   key: "sale price",
    //   render: (_, { salePrice }) => (salePrice ? salePrice : <>_</>),
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, data) => (
    //     <Space size="middle">
    //       {/* <a>Invite {record.name}</a> */}
    //       <a
    //         onClick={() => {
    //           handleDelete(data.id);
    //         }}
    //       >
    //         Delete
    //       </a>
    //     </Space>
    //   ),
    // },
  ];
  return <Table columns={columns} dataSource={tableData} />;
};

export default GeneratorTable;
