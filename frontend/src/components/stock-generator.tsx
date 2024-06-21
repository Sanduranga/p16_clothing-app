import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import {
  useDeleteCompositeDataMutation,
  useGetCompositeDataQuery,
  useResetMutationStateMutation,
} from "../redux/rtkApi";
import { itemTypes2 } from "../types/types";
import GeneratorTable from "./generator-table";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface inputTypes {
  sellerName: string;
  status: string;
  itemType: string;
}

const StockGenerator: React.FC = ({}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [filteredArray, setFilteredArray] = useState<itemTypes2[]>([]);
  const [filterInputs, setFilterInputs] = useState<inputTypes>({
    sellerName: "",
    status: "",
    itemType: "",
  });
  const [chartData, setChartData] = useState({
    normalStoreItems: 0,
    saleStoreItems: 0,
    stockClearingStoreItems: 0,
  });

  let storeState = useRef<string | null>(null);
  let deleteCode = useRef("null");

  const {
    data: fetchedAllData,
    isSuccess,
    isError,
  } = useGetCompositeDataQuery(); // get all items
  const [deleteCompositeData, { isSuccess: deletedOk, isError: deletedError }] =
    useDeleteCompositeDataMutation();
  const [resetMutationState] = useResetMutationStateMutation();

  useEffect(() => {
    // handling the messages
    if (deletedOk) {
      messageApi.open({
        type: "success",
        content: "Item deleted successfully!",
      });
    }
    if (deletedError) {
      messageApi.open({
        type: "error",
        content: "Item deleted failed!",
      });
    }
    if (isError) {
      messageApi.open({
        type: "error",
        content: "Item getting error!",
      });
    }
    resetMutationState(deleteCompositeData);
  }, [deletedOk, isError, deletedError]);

  let fetchedAllDataArray = [] as itemTypes2[];

  if (isSuccess) {
    const { itemsData, saleItemsData, stockClearItemsData } = fetchedAllData;
    // destructuring fetched all data and assigned them into one array call `fetchedAllDataArray`
    fetchedAllDataArray = [
      ...itemsData,
      ...saleItemsData,
      ...stockClearItemsData,
    ];
  }

  useEffect(() => {
    setChartData((prev) => ({
      ...prev,
      normalStoreItems: fetchedAllDataArray.filter(
        (item) => item.status === "normalStore"
      ).length,
      saleStoreItems: fetchedAllDataArray.filter(
        (item) => item.status === "sale"
      ).length,
      stockClearingStoreItems: fetchedAllDataArray.filter(
        (item) => item.status === "stockClearing"
      ).length,
    }));
    // saleStoreItems = fetchedAllDataArray.filter(
    //   (item) => item.status === "saleStore"
    // ).length;
    // stockClearingStoreItems = fetchedAllDataArray.filter(
    //   (item) => item.status === "stockClear"
    // ).length;

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
  }, [filterInputs, fetchedAllData]); // here I use fetchAllData into dependency array because once user delete the item, according to Rtkquerry validation tags, useGetCompositeDataQuery() data refetch. so due to change value of `fetchedAllData` useEffect hook is triggered and hence generator table data are updated.

  const handleSubmit = (data: inputTypes) => {
    storeState.current = data.sellerName;
    setFilterInputs(data);
  };

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
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 10,
        rotation: 20,
        radius: "80%",
      },
    ],
  };
  console.log(chartData);

  return (
    <div style={{ padding: "30px" }}>
      {contextHolder}
      <Row>
        <Col span={10}>
          <Doughnut data={chart} />
        </Col>
        <Col span={8}>
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
                    label: "Out source product",
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
                  { value: "sale", label: "Sale Store" },
                  { value: "stockClearing", label: "Stock clearing" },
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
                  { value: "mensShoes", label: "Men's Shoes" },
                  { value: "womensBlouses", label: "Women's Blouses" },
                  { value: "womensGeans", label: "Women's Geans" },
                  { value: "womensshoes", label: "Women's Shoes" },
                  { value: "womensBags", label: "Women's Bags" },
                  { value: "kidsDresses", label: "Kids Dresses" },
                  { value: "kidsShoes", label: "Kids Shoes" },
                  { value: "kidsBags", label: "Kids Bags" },
                ]}
              />
            </Form.Item>
            <Row>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Generate
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>

        <Col span={6}>
          <Row>
            <Col flex={2}>
              <Input
                name="sellerName"
                style={{ width: 250 }}
                placeholder="Enter the item code"
                variant="filled"
                onChange={(e) => {
                  deleteCode.current = e.target.value;
                }}
              />
            </Col>
            <Col flex={1}>
              <Button
                type="primary"
                danger
                onClick={() => {
                  deleteCompositeData(deleteCode.current);
                  deleteCode.current = "";
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <GeneratorTable tableData={filteredArray} refVal={storeState.current} />
    </div>
  );
};

export default StockGenerator;
