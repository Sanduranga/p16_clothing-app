import { Table, TableProps, Tag } from "antd";
import { itemTypes2 } from "../types/types";

const GeneratorTable = ({ tableData }: { tableData: itemTypes2[] }) => {
  //   const [deleteCompositeData, { isSuccess, isLoading, isError }] =
  //     useDeleteCompositeDataMutation();

  //   const handleDelete = async (id: number) => {
  //     deleteCompositeData(id);
  //   };
  //   if (isSuccess) {
  //     console.log("deleteSuccess");
  //   }
  //   if (isLoading) {
  //     console.log("deleteloading");
  //   }
  //   if (isError) {
  //     console.log("isError");
  //   }

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
      title: "Buying price",
      dataIndex: "buyingPrice",
      key: "buying price",
    },
    {
      title: "Percentage",
      //   dataIndex: "profitPercentage",
      key: "percentage",
      render: ({ profitPercentage, salePercentage }) =>
        profitPercentage ? profitPercentage : salePercentage,
    },
    {
      title: "Display price",
      //   dataIndex: "sellingPrice",
      key: "selling price",
      render: (_, { salePrice, sellingPrice }) =>
        sellingPrice ? sellingPrice : salePrice,
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
