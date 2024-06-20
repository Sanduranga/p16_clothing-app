import { useRef, useState } from "react";
import { Button, Form, Select } from "antd";
import { useGetCompositeDataQuery } from "../redux/rtkApi";
import { itemTypes2 } from "../types/types";
import { getAllData } from "../redux/slices/dataController";
import { useDispatch } from "react-redux";
import GeneratorTable from "./generator-table";

const StockGenerator = () => {
  //   const handleSelectChange = (value: string, name: string) => {
  //     setItem({
  //       ...item,
  //       [name]: value,
  //     });
  //   };
  const [filteredArray, setFilteredArray] = useState<itemTypes2[]>([]);
  const [storeStatus, setStoreStatus] = useState();
  let storestt = useRef<string | null>(null);
  const dispatch = useDispatch();
  const { data: fetchedAllData, isSuccess } = useGetCompositeDataQuery();
  let fetchedAllDataArray = [] as itemTypes2[];

  if (isSuccess) {
    const { itemsData, saleItemsData, stockClearItemsData } = fetchedAllData;
    fetchedAllDataArray = [
      ...itemsData,
      ...saleItemsData,
      ...stockClearItemsData,
    ];
    dispatch(getAllData(fetchedAllDataArray));
  }

  const filtering = (data: {
    sellerName: string;
    status: string;
    itemType: string;
  }) => {
    if (data.sellerName) {
      const filtering_1 =
        data.sellerName === "entgraItems"
          ? fetchedAllDataArray.filter((a) => a.sellerName === "entgraItems") ||
            []
          : fetchedAllDataArray.filter((a) => a.sellerName !== "entgraItems") ||
            [];
      if (data.status) {
        const filtering_2 =
          filtering_1.filter((a) => a.status === data.status) || [];
        if (data.itemType) {
          const filtering_3 =
            filtering_2.filter((a) => a.itemType === data.itemType) || [];
          setFilteredArray([...filtering_3]);
          return;
        }
        setFilteredArray([...filtering_2]);
        return;
      }
      if (data.itemType) {
        const filtering_2 =
          filtering_1.filter((a) => a.itemType === data.itemType) || [];
        setFilteredArray([...filtering_2]);
        return;
      }
      setFilteredArray([...filtering_1]);
      return;
    }

    if (data.status) {
      const filtering_2 =
        fetchedAllDataArray.filter((a) => a.status === data.status) || [];
      setFilteredArray([...filtering_2]);
      if (data.itemType) {
        const filtering_3 =
          filtering_2.filter((a) => a.itemType === data.itemType) || [];
        setFilteredArray([...filtering_3]);
        return;
      }
      setFilteredArray([...filtering_2]);
      return;
    }

    if (data.itemType) {
      const filtering_3 =
        fetchedAllDataArray.filter((a) => a.itemType === data.itemType) || [];
      setFilteredArray([...filtering_3]);
    }
  };

  const handleSubmit = (data: {
    sellerName: string;
    status: string;
    itemType: string;
  }) => {
    storestt.current = data.sellerName;
    filtering(data);
  };

  return (
    <div>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Item is" name="sellerName">
          <Select
            style={{ width: 250 }}
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
        <Form.Item label="Types of selling" name="status">
          <Select
            style={{ width: 250 }}
            allowClear
            options={[
              { value: "normalStore", label: "Normal Store" },
              { value: "sale", label: "Sale Store" },
              { value: "stockClearing", label: "Stock clearing" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Item type" name="itemType">
          <Select
            style={{ width: 250 }}
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Generate
          </Button>
        </Form.Item>
      </Form>
      <GeneratorTable tableData={filteredArray} refVal={storestt.current} />
    </div>
  );
};

export default StockGenerator;
