import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import { NormalStoreTypes } from "../../types/types";
import { useEffect, useRef, useState } from "react";
import { CodeGenerater, normalStorePriceCal } from "../../utils/utill";
import { usePostItemMutation } from "../../api";
import { useResetMutationStateMutation } from "../../api";

export const AddItems = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const firstRender = useRef(true);
  const [getInputs, setGetInputs] = useState({
    buyingPrice: 0,
    startingPrice: 0,
    profitPercentage: 0,
    displayPrice: 0,
  });
  const [item, setItem] = useState({ itemIs: "" });
  const handleSelectChange = (value: string, name: string) => {
    setItem({
      ...item,
      [name]: value,
    });
  };
  const [postItem, { isLoading, isSuccess, isError }] = usePostItemMutation();
  const [resetMutationState] = useResetMutationStateMutation();

  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
      return; // return component did mount lifecycle round
    }
    const aa = normalStorePriceCal(
      // send data to caculator and then asighn the answer to `aa`
      getInputs.buyingPrice,
      getInputs.profitPercentage
    );
    setGetInputs((prevInputs) => ({ ...prevInputs, displayPrice: aa }));
  }, [getInputs.profitPercentage, getInputs.buyingPrice]);

  const handleSubmit = async (data: NormalStoreTypes) => {
    const code = CodeGenerater(
      item.itemIs === "ourProduct" ? "entgraItem" : data.sellerName,
      data.itemType,
      data.itemColor,
      data.itemSize,
      data.materialName
    );

    postItem({
      itemColor: data.itemColor,
      itemTitle: data.itemTitle,
      itemSize: data.itemSize,
      itemType: data.itemType,
      materialName: data.materialName,
      sellerName:
        item.itemIs === "ourProduct" ? "entgraItems" : data.sellerName,
      buyingPrice: item.itemIs === "ourProduct" ? 0 : data.buyingPrice,
      profitPercentage:
        item.itemIs === "ourProduct" ? 0 : data.profitPercentage,
      startingPrice:
        item.itemIs === "ourProduct"
          ? data.startingPrice
          : getInputs.displayPrice,

      description: data.description,
      code: code,
      numberOfItems: data.numberOfItems,
      status: "normalStore",
      salePrice: null,
      salePercentage: null,
      stockClearingPrice: null,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Item added successfully!",
      });
    }
    if (isError) {
      messageApi.open({
        type: "error",
        content: "item added failed!",
      });
    }
    resetMutationState(postItem);
  }, [isSuccess, isError]);

  return (
    <div className="addItem">
      {contextHolder}
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row justify={"center"} gutter={{ sm: 20 }}>
          <Col md={{ span: 8 }} sm={12} xs={24}>
            <Form.Item
              label="Item is"
              name="itemIs"
              rules={[
                {
                  required: true,
                  message: "Please select one",
                },
              ]}
            >
              <Select
                style={{ width: 250 }}
                onChange={(value) => handleSelectChange(value, "itemIs")}
                options={[
                  { value: "ourProduct", label: "Our product" },
                  {
                    value: "anotherSellerProduct",
                    label: "Another seller's product",
                  },
                ]}
              />
            </Form.Item>

            {item.itemIs === "anotherSellerProduct" && (
              <>
                <Form.Item
                  label="Seller Name"
                  name="sellerName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter seller name",
                    },
                  ]}
                >
                  <Input name="sellerName" variant="filled" />
                </Form.Item>
                <Form.Item
                  label="Buying Price"
                  name="buyingPrice"
                  rules={[
                    {
                      required: true,
                      message: "Please enter buying price",
                    },
                  ]}
                >
                  <Input
                    name="buyingPrice"
                    onChange={(e) =>
                      setGetInputs({
                        ...getInputs,
                        [e.target.name]: Number(e.target.value),
                      })
                    }
                    variant="filled"
                    style={{ borderColor: "#1d914c" }}
                    type="number"
                  />
                </Form.Item>
                <Form.Item
                  label="Add percentage"
                  name="profitPercentage"
                  rules={[
                    {
                      required: true,
                      message: "Please enter percentage",
                    },
                  ]}
                >
                  <Input
                    name="profitPercentage"
                    onChange={(e) =>
                      setGetInputs({
                        ...getInputs,
                        [e.target.name]: Number(e.target.value),
                      })
                    }
                    variant="filled"
                    style={{ borderColor: "#1d914c" }}
                    type="number"
                  />
                </Form.Item>
              </>
            )}

            {item.itemIs === "ourProduct" && (
              <>
                {/* <Form.Item label="Seller Name" name="sellerName">
                  <Input
                    name="sellerName"
                    variant="filled"
                    placeholder={"entgraItem"}
                    value={"entgraItem"}
                    disabled
                  />
                </Form.Item> */}
                <Form.Item
                  label="Starting Price"
                  name="startingPrice"
                  rules={[
                    {
                      required: true,
                      message: "Please enter selling price",
                    },
                  ]}
                >
                  <Input
                    name="startingPrice"
                    onChange={(e) =>
                      setGetInputs({
                        ...getInputs,
                        [e.target.name]: Number(e.target.value),
                      })
                    }
                    variant="filled"
                    style={{ borderColor: "#1d914c" }}
                    type="number"
                  />
                </Form.Item>
              </>
            )}
            <Typography.Title level={4}>
              Display price:{" "}
              {item.itemIs === "ourProduct"
                ? getInputs.startingPrice
                : getInputs.displayPrice}
            </Typography.Title>
          </Col>

          <Col md={{ span: 12, offset: 1 }} sm={12} xs={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter item name",
                },
              ]}
              label="Item title"
              name="itemTitle"
            >
              <Input />
            </Form.Item>
            <Row justify="space-between">
              <Form.Item
                label="Item type"
                name="itemType"
                rules={[
                  {
                    required: true,
                    message: "Please select a type of the item",
                  },
                ]}
              >
                <Select
                  style={{ width: 250 }}
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
              <Form.Item
                label="Item size"
                name="itemSize"
                rules={[
                  {
                    required: true,
                    message: "Please select a size of the item",
                  },
                ]}
              >
                <Select
                  onChange={(value) => handleSelectChange(value, "itemSize")}
                  style={{ width: 250 }}
                  options={[
                    { value: "sm", label: "SM" },
                    { value: "md", label: "MD" },
                    { value: "l", label: "L" },
                    { value: "xl", label: "XL" },
                    { value: "2xl", label: "2XL" },
                  ]}
                />
              </Form.Item>
            </Row>
            <Row justify="space-between">
              <Form.Item
                label="Item color"
                name="itemColor"
                rules={[
                  {
                    required: true,
                    message: "Please enter item color",
                  },
                ]}
              >
                <Input style={{ width: 250 }} />
              </Form.Item>
              <Form.Item
                label="Number of items"
                name="numberOfItems"
                rules={[
                  {
                    required: true,
                    message: "Please enter number of items",
                  },
                ]}
              >
                <Input style={{ width: 250 }} type="number" />
              </Form.Item>
            </Row>

            <Form.Item
              label="Material Name"
              name="materialName"
              rules={[
                {
                  required: true,
                  message: "Please enter material name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter description",
                },
              ]}
              label="Description"
              name="description"
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Add Item
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
