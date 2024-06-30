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
import { useGetOneItemQuery, useUpdateItemMutation } from "../../api";
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
    updateItem,
    {
      isLoading: IsLoadingUpdateItem,
      isSuccess: IsSuccessUpdateItem,
      isError: IsUpdateError,
    },
  ] = useUpdateItemMutation();
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
    if (error) {
      message.open({
        type: "error",
        content: "Item getting error!",
      });
    }
    if (isGetSuccess) {
      if (IsSuccessUpdateItem) {
        message.open({
          type: "success",
          content: "moved item successfully!",
        });
        resetMutationState(updateItem);
        navigate(-1);
      }
    }
    if (IsUpdateError) {
      message.open({
        type: "error",
        content: "Item moving error!",
      });
    }
  }, [error, IsSuccessUpdateItem, IsUpdateError]);

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
        updateItem({
          id: data.id,
          itemColor: data.itemColor,
          itemSize: data.itemSize,
          itemType: data.itemType,
          itemTitle: data.itemTitle,
          sellerName: data.sellerName,
          materialName: data.materialName,
          buyingPrice: data.buyingPrice,
          salePercentage: getInputs.salePercentage,
          startingPrice: data.startingPrice,
          salePrice: getInputs.salePrice,
          description: data.description,
          status: "saleStore",
          code: data.code,
          numberOfItems: data.numberOfItems,
          stockClearingPrice: null,
          profitPercentage: data.profitPercentage,
        });
      } else {
        updateItem({
          id: data.id,
          itemColor: data.itemColor,
          itemSize: data.itemSize,
          itemType: data.itemType,
          itemTitle: data.itemTitle,
          sellerName: data.sellerName,
          materialName: data.materialName,
          buyingPrice: data.buyingPrice,
          stockClearingPrice: getInputs.stockClearingPrice,
          startingPrice: data.startingPrice,
          description: data.description,
          status: "stockClearingStore",
          code: data.code,
          numberOfItems: data.numberOfItems,
          salePercentage: null,
          salePrice: null,
          profitPercentage: data.profitPercentage,
        });
      }
      // setGetInputs({
      //   salePercentage: 0,
      //   salePrice: 0,
      //   stockClearingPrice: 0,
      // });
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
                        Buying price is: {data?.buyingPrice}
                      </Typography>
                      <Typography>
                        Present price is: {data?.startingPrice}
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
                <Button loading={IsLoadingUpdateItem} htmlType="submit">
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
