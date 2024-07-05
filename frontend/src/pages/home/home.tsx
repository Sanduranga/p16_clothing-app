import { Badge, Button, Card, Image, List, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
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

  const { data, isLoading, isError } = useGetAllItemsQuery();
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
    if (isError) {
      messageApi.open({
        type: "error",
        content: "Items getting failed",
      });
    }
    if (deleteSuccessSaleItm) {
      messageApi.open({
        type: "success",
        content: "item reset to normal section successfully!",
      });
      resetMutationState(deleteSaleItem);
    }
    if (deleteSuccessStockItm) {
      messageApi.open({
        type: "success",
        content: "item reset to normal section successfully!",
      });
      resetMutationState(deleteStockClearItem);
    }
    if (deleteErrorSaleItm) {
      messageApi.open({
        type: "error",
        content: "item reset to normal section failed!",
      });
      resetMutationState(deleteSaleItem);
    }
    if (deleteErrorStockItm) {
      messageApi.open({
        type: "error",
        content: "item reset to normal section failed!",
      });
      resetMutationState(deleteStockClearItem);
    }
  }, [
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
                  actions={[
                    <ShoppingCartOutlined />,
                    logged && products.status === "normalStore" ? (
                      <Button
                        type="primary"
                        onClick={() => navigate(`/set-discount/${products.id}`)}
                        style={{ padding: 2 }}
                      >
                        Set discount
                      </Button>
                    ) : logged && products.status === "saleStore" ? (
                      <Button
                        type="primary"
                        onClick={() => {
                          try {
                            const saleItemId = products.saleItems?.id;
                            if (saleItemId !== undefined) {
                              deleteSaleItem(saleItemId);
                            }
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
                    ) : (
                      logged && (
                        <Button
                          type="primary"
                          onClick={() => {
                            try {
                              const stockItemId = products.saleItems?.id;
                              if (stockItemId !== undefined) {
                                deleteStockClearItem(stockItemId);
                              }
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
                      <Typography.Paragraph>
                        Price: Rs
                        {products.status === "saleStore"
                          ? products.saleItems?.salePrice
                          : products.status === "stockClearingStore"
                          ? products.stockClearItems?.stockClearingPrice
                          : products.startingPrice}
                      </Typography.Paragraph>
                    }
                    description={
                      <Typography.Paragraph
                        ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                      >
                        {products.description}
                      </Typography.Paragraph>
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
