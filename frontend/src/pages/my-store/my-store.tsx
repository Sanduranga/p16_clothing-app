import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { itemTypes } from "../../types/types";
import GeneratorTable from "./sub-components/generator-table";
import {
  useDeleteItemMutation,
  useGetAllItemsQuery,
  useResetMutationStateMutation,
} from "../../api";

ChartJS.register(ArcElement, Tooltip, Legend);

interface inputTypes {
  sellerName: string;
  status: string;
  itemType: string;
}

export const MyStore: React.FC = ({}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isSuccess, isError } = useGetAllItemsQuery(); // get all items
  const [deleteItem, { isSuccess: deletedOk, isError: deletedError }] =
    useDeleteItemMutation();
  const [resetMutationState] = useResetMutationStateMutation();

  let fetchedAllDataArray = [] as itemTypes[];

  if (isSuccess) {
    fetchedAllDataArray = [...data];
  }

  const intialTable = fetchedAllDataArray;

  const [filteredArray, setFilteredArray] = useState<itemTypes[]>(intialTable);
  const [filterInputs, setFilterInputs] = useState<inputTypes>({
    sellerName: "",
    status: "",
    itemType: "",
  });

  let deleteCode = useRef("null"); // to catch the input item code going to be deleted.

  useEffect(() => {
    // this useEffect hook is used for handling the messages because `deletedOk, isError, deletedError` are promices. so weneed to rerender the component once they are changed.
    if (deletedOk) {
      messageApi.open({
        type: "success",
        content: "Item deleted successfully!",
      });
    } else if (deletedError) {
      messageApi.open({
        type: "error",
        content: "Item deleted failed!",
      });
    } else if (isError) {
      messageApi.open({
        type: "error",
        content: "Item getting failed!",
      });
    }
    resetMutationState(deleteItem);
  }, [deletedOk, isError, deletedError]);

  useEffect(() => {
    setFilteredArray(fetchedAllDataArray); // set default table data

    //setting chart data
    setChartData((prev) => ({
      ...prev,
      normalStoreItems: fetchedAllDataArray.filter(
        (item) => item.status === "normalStore"
      ).length,
      saleStoreItems: fetchedAllDataArray.filter(
        (item) => item.status === "saleStore"
      ).length,
      stockClearingStoreItems: fetchedAllDataArray.filter(
        (item) => item.status === "stockClearingStore"
      ).length,
    }));

    // start filtering the fetched data according to input selectors
    if (filterInputs.sellerName) {
      const filtering_1 =
        filterInputs.sellerName === "entgraItems"
          ? fetchedAllDataArray.filter((a) => a.sellerName === "entgraItems") ||
            []
          : fetchedAllDataArray.filter((a) => a.sellerName !== "entgraItems") ||
            [];
      if (filterInputs.status) {
        const filtering_2 =
          filtering_1.filter((a) => a.status === filterInputs.status) || [];
        if (filterInputs.itemType) {
          const filtering_3 =
            filtering_2.filter((a) => a.itemType === filterInputs.itemType) ||
            [];
          setFilteredArray([...filtering_3]);
          return;
        }
        setFilteredArray([...filtering_2]);
        return;
      }
      if (filterInputs.itemType) {
        const filtering_2 =
          filtering_1.filter((a) => a.itemType === filterInputs.itemType) || [];
        setFilteredArray([...filtering_2]);
        return;
      }
      setFilteredArray([...filtering_1]);
      return;
    }

    if (filterInputs.status) {
      const filtering_2 =
        fetchedAllDataArray.filter((a) => a.status === filterInputs.status) ||
        [];
      setFilteredArray([...filtering_2]);
      if (filterInputs.itemType) {
        const filtering_3 =
          filtering_2.filter((a) => a.itemType === filterInputs.itemType) || [];
        setFilteredArray([...filtering_3]);
        return;
      }
      setFilteredArray([...filtering_2]);
      return;
    }

    if (filterInputs.itemType) {
      const filtering_3 =
        fetchedAllDataArray.filter(
          (a) => a.itemType === filterInputs.itemType
        ) || [];
      setFilteredArray([...filtering_3]);
    }
  }, [filterInputs, data]); // here I use fetchAllData into dependency array because once user delete the item, according to Rtkquerry validation tags, useGetCompositeDataQuery() data is also refetched. so then due to change value of `fetchedAllData` useEffect hook is triggered and hence generator table data are updated. Also change and by pressing generate button, filter inputs are also changed and then trigered this useEffect hook.

  const [chartData, setChartData] = useState({
    normalStoreItems: 0,
    saleStoreItems: 0,
    stockClearingStoreItems: 0,
  });

  const handleSubmit = (data: inputTypes) => {
    // storeState.current = data.sellerName;
    setFilterInputs(data);
  };

  // configuring the chart data
  const chart = {
    labels: ["Normal", "Sale", "Stock clearing"],
    datasets: [
      {
        label: "No. of items",
        data: [
          chartData.normalStoreItems,
          chartData.saleStoreItems,
          chartData.stockClearingStoreItems,
        ],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 99, 132)",
        ],
        borderColor: [
          "rgb(108, 144, 189)",
          "rgb(108, 144, 189)",
          "rgb(108, 144, 189)",
        ],
        hoverOffset: 4,
        borderWidth: 2,
        borderRadius: 10,
        spacing: 3,
        cutout: 5,
        rotation: 20,
        radius: "100%",
      },
    ],
  };

  return (
    <Row gutter={[0, 32]} style={{ marginTop: 30 }}>
      {contextHolder}
      <Col
        xs={24}
        lg={10}
        style={{ display: "flex", height: "350px", justifyContent: "center" }}
      >
        <Doughnut data={chart} />
      </Col>

      <Col
        xs={24}
        lg={14}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item name="sellerName">
            <Select
              style={{ width: 250 }}
              placeholder="Item is"
              allowClear
              options={[
                { value: "entgraItems", label: "Our product" },
                {
                  value: "notEntgraItems",
                  label: "An outsource product",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="status">
            <Select
              style={{ width: 250 }}
              placeholder="Types of selling"
              allowClear
              options={[
                { value: "normalStore", label: "Normal Store" },
                { value: "saleStore", label: "Sale Store" },
                { value: "stockClearingStore", label: "Stock clearing" },
              ]}
            />
          </Form.Item>
          <Form.Item name="itemType">
            <Select
              style={{ width: 250 }}
              placeholder="Item type"
              allowClear
              options={[
                { value: "mensShirts", label: "Men's Shirts" },
                { value: "mensGeans", label: "Men's Geans" },
                { value: "womensBlouses", label: "Women's Blouses" },
                { value: "womensGeans", label: "Women's Geans" },
                { value: "kidsDresses", label: "Kids Dresses" },
                { value: "kidsShoes", label: "Kids Shoes" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Generate
            </Button>
          </Form.Item>
        </Form>
        <Col>
          <Input
            style={{ width: 250 }}
            placeholder="Enter the item code"
            onChange={(e) => {
              deleteCode.current = e.target.value;
            }}
          />
        </Col>

        <Button
          type="primary"
          danger
          style={{ margin: 20 }}
          onClick={() => {
            deleteItem(deleteCode.current);
            deleteCode.current = "";
          }}
        >
          Delete
        </Button>
      </Col>

      <Col span={24} style={{ overflowX: "scroll", padding: "0px 10px" }}>
        <GeneratorTable tableData={filteredArray} />
      </Col>
    </Row>
  );
};
