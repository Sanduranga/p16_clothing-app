import { Col, Form, Input, Row, Select, Spin, Typography, message } from "antd";
import { CodeGenerater, SalePriceCal } from "../lib/utill";
import { itemTypes } from "../types/types";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOneItemQuery } from "../redux/rtkApi";

const SetDiscountForm = () => {
  const firstRender = useRef(true);
  const [load, setLoad] = useState(false);
  const [getInputs, setGetInputs] = useState({
    buyingPrice: 0,
    sellingPrice: 0,
    salePercentage: 0,
    salePrice: 0,
    normalPercentage: 0,
  });
  console.log(getInputs);
  const [item, setItem] = useState({ sellingType: "", itemIs: "" });
  const handleSelectChange = (value: string, name: string) => {
    setItem({
      ...item,
      [name]: value,
    });
  };
  console.log(item);
  console.log(firstRender);

  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
      return;
    }
    const aa = SalePriceCal(
      getInputs.sellingPrice,
      getInputs.buyingPrice,
      getInputs.salePercentage,
      getInputs.normalPercentage,
      item.sellingType,
      item.itemIs
    );
    if (typeof aa === "number") {
      setGetInputs((prevInputs) => ({ ...prevInputs, salePrice: aa }));
    } else {
      console.error("SalePriceCal did not return a number");
    }

    console.log(aa);
  }, [
    getInputs.sellingPrice,
    getInputs.buyingPrice,
    getInputs.salePercentage,
    getInputs.normalPercentage,
    item.sellingType,
    item.itemIs,
  ]);

  const handleSubmit = async (data: itemTypes) => {
    setLoad(true);
    const code = CodeGenerater(
      data.name,
      data.itemType,
      data.itemColor,
      data.itemSize,
      data.materialName
    );

    const res = await fetch("http://localhost:8080/api/items/add-item", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        itemColor: data.itemColor,
        itemIs: data.itemIs,
        itemTitle: data.itemTitle,
        itemSize: data.itemSize,
        itemType: data.itemType,
        materialName: data.materialName,
        buyingPrice: data.buyingPrice,
        name: data.name,
        normalPercentage: data.normalPercentage,
        salePercentage: data.salePercentage,
        sellingType: data.sellingType,
        sellingPrice: data.sellingPrice,
        // getInputs: getInputs,
        stockClearingPrice: data.stockClearingPrice,
        description: data.description,
        code: code,
        numberOfItems: data.numberOfItems,
      }),
    });
    if (res.ok) {
      setLoad(false);
      message.open({
        type: "success",
        content: "Registered successfully!",
      });
    }
    if (!res.ok) {
      setLoad(false);
      message.open({
        type: "error",
        content: "Something went wrong!",
      });
    }
  };

  const { code } = useParams<{ code: "string" }>();
  const { data, isLoading, error } = useGetOneItemQuery(code!, {
    skip: !code,
  });
  if (error) {
    message.open({
      type: "error",
      content: "Item getting error!",
    });
  }

  return (
    <>
      {isLoading ? (
        <Spin tip="Loading" size="large" fullscreen={true} />
      ) : (
        <Row
          style={{ marginTop: 20, padding: "0 20px" }}
          gutter={[20, { sm: 20, xs: 20 }]}
        >
          <Col sm={24} md={12} lg={12}>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={{ sm: 20 }}>
                <Col md={{ span: 8 }} sm={12} xs={24}>
                  {item.itemIs === "anotherSeller" ? (
                    <>
                      <Typography>Item is: {data?.itemIs}</Typography>
                      <Typography>
                        Buying price is: {data?.buyingPrice}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography>Item Is: {"Our product"}</Typography>
                      <Typography>
                        Selling price is: {data?.sellingPrice}
                      </Typography>
                    </>
                  )}

                  <Form.Item
                    label="Types of selling"
                    name="sellingType"
                    rules={[
                      {
                        required: true,
                        message: "Please select one",
                      },
                    ]}
                  >
                    <Select
                      onChange={(value) =>
                        handleSelectChange(value, "sellingType")
                      }
                      style={{ width: 250 }}
                      options={[
                        { value: "sale", label: "Sale" },
                        { value: "stockClearing", label: "Stock clearing" },
                      ]}
                    />
                  </Form.Item>

                  {item.sellingType === "sale" && (
                    <>
                      <Form.Item
                        label="Sale Percentage"
                        name="salePercentage"
                        rules={[
                          {
                            required: true,
                            max: 100,
                            min: 1,
                            message: "Please enter sale percentage",
                          },
                        ]}
                      >
                        <Input
                          variant="filled"
                          style={{ borderColor: "#1d914c" }}
                          type="number"
                          name="salePercentage"
                          onChange={(e) =>
                            setGetInputs({
                              ...getInputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </>
                  )}
                  {item.sellingType === "stockClearing" && (
                    <Form.Item
                      label="Stock Clearing Price"
                      name="stockClearingPrice"
                      rules={[
                        {
                          required: true,
                          message: "Please enter stock clearing price",
                        },
                      ]}
                    >
                      <Input
                        variant="filled"
                        style={{ borderColor: "#1d914c" }}
                        type="number"
                      />
                    </Form.Item>
                  )}

                  <Typography.Title level={4}>
                    Display price: {getInputs.salePrice}
                  </Typography.Title>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SetDiscountForm;
