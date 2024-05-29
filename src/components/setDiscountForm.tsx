import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Typography,
  message,
} from "antd";
import { saleStorePriceCal } from "../lib/utill";
import { discountItemsTypes } from "../types/types";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteItemMutation,
  useGetOneItemQuery,
  usePostSaleItemMutation,
  usePostStockClearItemMutation,
} from "../redux/rtkApi";

const SetDiscountForm = () => {
  const firstRender = useRef(true);
  const [getInputs, setGetInputs] = useState({
    salePercentage: 0,
    salePrice: 0,
    stockClearingPrice: 0,
  });

  const { code } = useParams<{ code: "string" }>();
  const {
    data,
    isLoading,
    error,
    isSuccess: isGetSuccess,
  } = useGetOneItemQuery(code!, {
    skip: !code,
  });
  const [
    postSaleItem,
    { isLoading: IsLoadingSaleItem, isSuccess: IsSuccessSaleItem },
  ] = usePostSaleItemMutation();
  const [
    postStockClearItem,
    { isLoading: IsLoadingStockItem, isSuccess: IsSuccessStockItem },
  ] = usePostStockClearItemMutation();
  const [deleteItem, { isSuccess: deletedOk, error: deleteError }] =
    useDeleteItemMutation();

  const [item, setItem] = useState({ sellingType: "" });
  const handleSelectChange = (value: string, name: string) => {
    setItem({
      ...item,
      [name]: value,
    });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (isGetSuccess) {
      const aa = saleStorePriceCal(getInputs.salePercentage, data.sellingPrice);
      setGetInputs((prevInputs) => ({ ...prevInputs, salePrice: aa }));
    }
  }, [getInputs.salePercentage]);

  if (deleteError) {
    message.open({
      type: "error",
      content: "Item deleted failed!",
    });
  }
  if (error) {
    message.open({
      type: "error",
      content: "Item getting error!",
    });
  }
  if (deletedOk) {
    message.open({
      type: "success",
      content: "Item delete successfully!",
    });
  }
  if (IsSuccessSaleItem) {
    message.open({
      type: "success",
      content: "Added successfully!",
    });
  }
  if (IsSuccessStockItem) {
    message.open({
      type: "success",
      content: "Added successfully!",
    });
  }

  const handleSubmit = (submitData: discountItemsTypes) => {
    if (isGetSuccess) {
      if (getInputs.salePrice < data.buyingPrice) {
        message.open({
          type: "error",
          content: "Sale price should be greater than buying price!",
        });
        return;
      }
      if (submitData.status === "sale") {
        postSaleItem({
          id: data.id,
          itemColor: data.itemColor,
          itemSize: data.itemSize,
          itemType: data.itemType,
          itemTitle: data.itemTitle,
          sellerName: data.sellerName,
          materialName: data.materialName,
          buyingPrice: data.buyingPrice,
          salePercentage: getInputs.salePercentage,
          sellingPrice: data.sellingPrice,
          salePrice: getInputs.salePrice,
          description: data.description,
          status: submitData.status,
          code: data.code,
          numberOfItems: data.numberOfItems,
        });
      } else {
        postStockClearItem({
          id: data.id,
          itemColor: data.itemColor,
          itemSize: data.itemSize,
          itemType: data.itemType,
          itemTitle: data.itemTitle,
          sellerName: data.sellerName,
          materialName: data.materialName,
          buyingPrice: data.buyingPrice,
          stockClearingPrice: getInputs.stockClearingPrice,
          sellingPrice: data.sellingPrice,
          description: data.description,
          status: submitData.status,
          code: data.code,
          numberOfItems: data.numberOfItems,
        });
      }
      console.log("dele");
      deleteItem(data.id as any);
      setGetInputs({
        salePercentage: 0,
        salePrice: 0,
        stockClearingPrice: 0,
      });
    }
  };

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
                  {isGetSuccess && data.buyingPrice > 0 ? (
                    <>
                      <Typography>
                        Item is: {"Another seller product"}
                      </Typography>
                      <Typography>
                        Buying price is: {data?.buyingPrice}
                      </Typography>
                      <Typography>
                        Present price is: {data?.sellingPrice}
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
                    name="status"
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
                              [e.target.name]: Number(e.target.value),
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
                        name="stockClearingPrice"
                        type="number"
                        onChange={(e) =>
                          setGetInputs({
                            ...getInputs,
                            [e.target.name]: Number(e.target.value),
                          })
                        }
                      />
                    </Form.Item>
                  )}

                  <Typography.Title level={4}>
                    Display price:{" "}
                    {item.sellingType === "sale"
                      ? getInputs.salePrice
                      : getInputs.stockClearingPrice}
                  </Typography.Title>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  loading={IsLoadingSaleItem || IsLoadingStockItem}
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SetDiscountForm;
