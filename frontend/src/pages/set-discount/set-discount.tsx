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
import { allDataTypes } from "../../types/types";
import { useResetMutationStateMutation } from "../../api";

export const SetDiscount = () => {
  const [getInputs, setGetInputs] = useState({
    salePercentage: 0,
    salePrice: 0,
    stockClearingPrice: 0,
  });
  const [item, setItem] = useState({ sellingType: "" });

  const navigate = useNavigate();

  const { code } = useParams<{ code: "string" }>(); // catching path variable by using `useParams`
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

  const handleSubmit = (submitData: allDataTypes) => {
    if (isGetSuccess) {
      if (
        item.sellingType === "sale" &&
        data.buyingPrice &&
        getInputs.salePrice < data.buyingPrice
      ) {
        message.open({
          type: "error",
          content: "Sale price should be greater than buying price!",
        });
        return;
      }

      if (submitData.status === "sale") {
        postSaleItem({
          id: data.id,
          salePercentage: getInputs.salePercentage,
          salePrice: getInputs.salePrice,
        });
      } else {
        postStockClearItem({
          id: data.id,
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
          <Col sm={24} md={12} lg={12}>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={{ sm: 20 }}>
                <Col md={{ span: 8 }} sm={12} xs={24}>
                  {isGetSuccess && data.buyingPrice && data.buyingPrice > 0 ? (
                    <>
                      <Typography>Item is: Another seller product</Typography>
                      <Typography>
                        Buying price is: {data.buyingPrice}
                      </Typography>
                      <Typography>
                        Present price is: {data.startingPrice}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography>Item Is: Our product</Typography>
                      <Typography>
                        Starting price is: {data?.startingPrice}
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
                  loading={IsLoadingSaleItem || IsLoadingStockClrItem}
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
