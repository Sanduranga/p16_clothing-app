import { Badge, Button, Card, Image, List, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import {
  useGetAllItemsQuery,
  useDeleteSaleItemMutation,
  useResetMutationStateMutation,
  useDeleteStockClearItemMutation,
} from "../../api";

const Home: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const logged = useSelector(
    (state: RootState) => state.appController.loggedUser.loggedIn
  );

  const { data, isSuccess, isLoading, isError } = useGetAllItemsQuery();
  const [
    deleteSaleItem,
    { isSuccess: deleteSuccessSaleItm, isError: deleteErrorSaleItm },
  ] = useDeleteSaleItemMutation();
  const [
    deleteStockClearItem,
    { isSuccess: deleteSuccessStockItm, isError: deleteErrorStockItm },
  ] = useDeleteStockClearItemMutation();
  const [resetMutationState] = useResetMutationStateMutation();

  useEffect(() => {
    if (isSuccess && data.length === 0) {
      messageApi.open({
        type: "warning",
        content: "No data to get!",
      });
    }
    if (isError) {
      messageApi.open({
        type: "error",
        content: "Items getting failed",
      });
    }
    if (deleteSuccessSaleItm) {
      messageApi.open({
        type: "success",
        content: "item moved to normal section successfully!",
      });
      resetMutationState(deleteSaleItem);
    }
    if (deleteSuccessStockItm) {
      messageApi.open({
        type: "success",
        content: "item moved to normal section successfully!",
      });
      resetMutationState(deleteStockClearItem);
    }
    if (deleteErrorSaleItm) {
      messageApi.open({
        type: "error",
        content: "item moved to normal section failed!",
      });
      resetMutationState(deleteSaleItem);
    }
    if (deleteErrorStockItm) {
      messageApi.open({
        type: "error",
        content: "item moved to normal section failed!",
      });
      resetMutationState(deleteStockClearItem);
    }
  }, [
    isSuccess,
    isError,
    deleteSuccessSaleItm,
    deleteSuccessStockItm,
    deleteErrorSaleItm,
    deleteErrorStockItm,
  ]);

  return (
    <div style={{ margin: 20 }}>
      {contextHolder}
      <List
        loading={isLoading}
        grid={{
          gutter: 16,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 6,
        }}
        renderItem={(products, index) => {
          return (
            <List.Item key={index}>
              <Badge.Ribbon
                text={
                  products.status === "saleStore"
                    ? `${products.saleItems?.salePercentage}% sale`
                    : products.status === "stockClearingStore"
                    ? "stock clearing"
                    : null
                }
                color={
                  products.status === "saleStore"
                    ? "yellow"
                    : products.status === "stockClearingStore"
                    ? "red"
                    : "white"
                }
              >
                <Card
                  title={products.itemTitle}
                  style={{ backgroundColor: "#ebeff5" }}
                  actions={[
                    logged && products.status === "normalStore" ? (
                      <Button
                        type="primary"
                        style={{
                          fontWeight: "bold",
                        }}
                        onClick={() =>
                          navigate(`/set-discount/${products.code}`)
                        }
                      >
                        Set discount
                      </Button>
                    ) : (
                      logged && (
                        <Button
                          style={{
                            borderColor: "#0b629c",
                            color: "#cc213b",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            try {
                              products.status === "saleStore"
                                ? deleteSaleItem(products.code)
                                : deleteStockClearItem(products.code);
                            } catch (error) {
                              messageApi.open({
                                type: "error",
                                content: "Item resetting failed!",
                              });
                            }
                          }}
                        >
                          Undo discount
                        </Button>
                      )
                    ),
                  ]}
                  cover={
                    <Image
                      preview={false}
                      className="itemCardImage"
                      src={"bag.jpg"}
                    />
                  }
                  loading={isLoading}
                >
                  <Card.Meta
                    title={
                      <Typography.Title level={3}>
                        Rs.{""}
                        {products.status === "saleStore"
                          ? products.saleItems?.salePrice.toFixed(2)
                          : products.status === "stockClearingStore"
                          ? products.stockClearItems?.stockClearingPrice.toFixed(
                              2
                            )
                          : products.startingPrice.toFixed(2)}
                      </Typography.Title>
                    }
                    description={
                      <>
                        <Typography.Text strong>
                          Quantity: {""}
                          {products.numberOfItems}
                        </Typography.Text>
                        <Typography.Paragraph
                          ellipsis={{
                            rows: 1,
                            expandable: true,
                            symbol: "more",
                          }}
                        >
                          {products.description}
                        </Typography.Paragraph>
                      </>
                    }
                  ></Card.Meta>
                </Card>
              </Badge.Ribbon>
            </List.Item>
          );
        }}
        dataSource={data}
      ></List>
    </div>
  );
};

export { Home };
