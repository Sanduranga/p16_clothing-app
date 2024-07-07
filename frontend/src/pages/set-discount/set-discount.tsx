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
import { saleStorePriceCal } from "../../utils/utill";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneItemQuery,
  usePostSaleItemMutation,
  usePostStockClearItemMutation,
} from "../../api";
import { itemTypes } from "../../types/types";
import { useResetMutationStateMutation } from "../../api";

export const SetDiscount = () => {
  const [getInputs, setGetInputs] = useState({
    salePercentage: 0,
    salePrice: 0,
    stockClearingPrice: 0,
  });
  const [item, setItem] = useState({ sellingType: "" });

  const navigate = useNavigate();

  const { code } = useParams<{ code: string }>(); // catching path variable by using `useParams`
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
    {
      isLoading: IsLoadingSaleItem,
      isSuccess: IsSuccessSaleItem,
      isError: IsSaleError,
    },
  ] = usePostSaleItemMutation();
  const [
    postStockClearItem,
    {
      isLoading: IsLoadingStockClrItem,
      isSuccess: IsSuccessStockClrItem,
      isError: IsStockClrError,
    },
  ] = usePostStockClearItemMutation();
  const [resetMutationState] = useResetMutationStateMutation();

  const handleSelectChange = (value: string, name: string) => {
    setItem({
      ...item,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isGetSuccess) {
      const aa = saleStorePriceCal(
        // calling utility function to calculate new prices
        getInputs.salePercentage,
        data.startingPrice
      );
      setGetInputs((prevInputs) => ({ ...prevInputs, salePrice: aa }));
    }
  }, [getInputs.salePercentage]);

  useEffect(() => {
    // handle messages
    if (error) {
      message.open({
        type: "error",
        content: "Item getting error!",
      });
    }
    if (IsSuccessSaleItem || IsSuccessStockClrItem) {
      message.open({
        type: "success",
        content: "moved item successfully!",
      });
      resetMutationState(postSaleItem);
      resetMutationState(postStockClearItem);
      navigate(-1);
    }

    if (IsSaleError || IsStockClrError) {
      message.open({
        type: "error",
        content: "Item moving error!",
      });
      resetMutationState(postSaleItem);
      resetMutationState(postStockClearItem);
    }
  }, [
    error,
    IsSuccessSaleItem,
    IsSuccessStockClrItem,
    IsSaleError,
    IsStockClrError,
  ]);

  const handleSubmit = (submitData: itemTypes) => {
    if (isGetSuccess) {
      if (
        item.sellingType === "sale" &&
        data.buyingPrice &&
        getInputs.salePrice < data.buyingPrice
        // checks whether outsource product's buying price greater than new sale price and if true set error msg.
      ) {
        message.open({
          type: "error",
          content: "Sale price should be greater than buying price!",
        });
        return;
      }

      if (submitData.status === "sale") {
        postSaleItem({
          itemsCode: data.code,
          salePercentage: getInputs.salePercentage,
          salePrice: getInputs.salePrice,
        });
      } else {
        postStockClearItem({
          itemsCode: data.code,
          stockClearingPrice: getInputs.stockClearingPrice,
        });
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Spin tip="Loading" size="large" fullscreen={true} />
      ) : (
        <Row
          style={{ marginTop: 20, padding: "0 20px" }}
          justify="center"
          gutter={[20, { sm: 20, xs: 20 }]}
        >
          <Col
            sm={24}
            md={12}
            lg={12}
            style={{
              backgroundColor: "#dae6dd",
              padding: 10,
              boxShadow: "1px 2px 2px #00000055",
            }}
          >
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={{ sm: 20 }} justify={"center"}>
                <Col span={18}>
                  {data?.sellerName === "entgraItems" ? (
                    // here checks whether the item is our own one or not
                    <>
                      <Typography.Title level={5}>
                        We own this item.
                      </Typography.Title>
                      <Typography.Text strong>
                        Starting price is: {data?.startingPrice}
                      </Typography.Text>
                    </>
                  ) : (
                    <>
                      <Typography.Title level={5}>
                        This item is another seller product.
                      </Typography.Title>
                      <Typography.Text strong>
                        Buying price is: {data?.buyingPrice}
                      </Typography.Text>
                      <Typography>
                        Present price is: {data?.startingPrice}
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
                      ? getInputs.salePrice.toFixed(2)
                      : getInputs.stockClearingPrice.toFixed(2)}
                  </Typography.Title>
                </Col>
              </Row>
              <Row justify={"center"}>
                <Form.Item>
                  <Button
                    loading={IsLoadingSaleItem || IsLoadingStockClrItem}
                    htmlType="submit"
                    type="primary"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};
