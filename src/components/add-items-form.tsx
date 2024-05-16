import { Button, Form, Input, Select, message } from "antd";
import { Item, userlogingTypes } from "../types/types";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Option } from "antd/es/mentions";

const AddFormItems = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSubmit = async (data: userlogingTypes) => {
    console.log(data);

    // setLoad(true);
    // const res = await fetch("http://localhost:8080/api/users/add-user", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: data.name,
    //     email: data.email,
    //     password: data.password,
    //     userType: userType,
    //   }),
    // });
    // if (res.ok) {
    //   setLoad(false);
    //   message.open({
    //     type: "success",
    //     content: "Registered successfully!",
    //   });
    // }
    // if (!res.ok) {
    //   setLoad(false);
    //   message.open({
    //     type: "error",
    //     content: "Something went wrong!",
    //   });
    // }
  };
  const [item, setItem] = useState<Partial<Item>>({});
  const handleSelectChange = (value: string, name: string) => {
    setItem({
      ...item,
      [name]: value,
    });
  };

  return (
    <div className="addItem">
      <Form
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          justifyItems: "stretch",
        }}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div style={{ flexGrow: 1, padding: "0 20px" }}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
            label="Name"
            name="name"
          >
            <Input />
          </Form.Item>

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
          {item.itemIs === "anotherSeller" && (
            <>
              <Form.Item label="Buying Price" name="buyingPrice">
                <Input type="number" />
              </Form.Item>
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
              onChange={(value) => handleSelectChange(value, "sellingType")}
              style={{ width: 250 }}
              options={[
                { value: "normal", label: "Normal" },
                { value: "sale", label: "Sale" },
                { value: "stockClearing", label: "Stock clearing" },
              ]}
            />
          </Form.Item>
          {item.sellingType === "normal" &&
            item.itemIs === "anotherSellerProduct" && (
              <Form.Item
                label="Add Percentage"
                name="addPercentage"
                rules={[
                  {
                    required: true,
                    message: "Please add percentage",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            )}
          {item.sellingType === "sale" && (
            <Form.Item
              label="Sale Percentage"
              name="salePercentage"
              rules={[
                {
                  required: true,
                  message: "Please enter sale percentage",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
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
              <Input type="number" />
            </Form.Item>
          )}
          {item.sellingType === "normal" && item.itemIs === "ourProduct" && (
            <Form.Item
              label="Selling Price"
              name="sellingPrice"
              rules={[
                {
                  required: true,
                  message: "Please enter selling price",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          )}
        </div>
        <div style={{ flexGrow: 1, padding: "0 20px" }}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter item name",
              },
            ]}
            label="Item name"
            name="itemName"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Item type"
            name="itemType"
            rules={[
              {
                required: true,
                message: "Please enter item type",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Item size"
            name="itemSize"
            rules={[
              {
                required: true,
                message: "Please select one",
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Item
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddFormItems;
