import { Badge, Button, Card, Image, List, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import {
  useGetAllItemsQuery,
  useUpdateItemMutation,
  useResetMutationStateMutation,
} from "../../api";

const Home: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const logged = useSelector(
    (state: RootState) => state.appController.loggedUser.loggedIn
  );

  const { data, isLoading, isError } = useGetAllItemsQuery();
  const [updateItem, { isSuccess: postSuccess, isError: postError }] =
    useUpdateItemMutation();
  const [resetMutationState] = useResetMutationStateMutation();

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: "error",
        content: "Items getting failed",
      });
    }
    if (postSuccess) {
      messageApi.open({
        type: "success",
        content: "item reset to normal section successfully!",
      });
    }
    if (postError) {
      messageApi.open({
        type: "error",
        content: "item reset to normal section failed!",
      });
    }
    resetMutationState(updateItem);
  }, [isError, postSuccess, postError]);

  return (
    <div style={{ margin: 20 }}>
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
              {contextHolder}
              <Badge.Ribbon
                text={
                  products.status === "saleStore"
                    ? `${products.salePercentage}% sale`
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
                        onClick={() => navigate(`/set-discount/${products.id}`)}
                      >
                        Set discount
                      </Button>
                    ) : logged ? (
                      <Button
                        type="primary"
                        onClick={async () => {
                          try {
                            await updateItem({
                              id: products.id,
                              itemColor: products.itemColor,
                              itemTitle: products.itemTitle,
                              itemSize: products.itemSize,
                              itemType: products.itemType,
                              materialName: products.materialName,
                              sellerName: products.sellerName,
                              buyingPrice: products.buyingPrice,
                              profitPercentage: products.profitPercentage,
                              startingPrice: products.startingPrice,
                              description: products.description,
                              code: products.code,
                              numberOfItems: products.numberOfItems,
                              status: "normalStore",
                              salePrice: null,
                              salePercentage: null,
                              stockClearingPrice: null,
                            }).unwrap();
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
                    ) : null,
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
                          ? products.salePrice
                          : products.status === "stockClearingStore"
                          ? products.stockClearingPrice
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
