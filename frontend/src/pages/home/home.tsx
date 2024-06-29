import { Badge, Button, Card, Image, List, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useRef } from "react";
import {
  useDeleteStockItemMutation,
  useGetCompositeDataQuery,
  usePostItemMutation,
  useResetMutationStateMutation,
  useUpdateItemMutation,
} from "../../api";
import { NormalStoreTypes } from "../../types/types";

const Home: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const deleteCode = useRef<number | null>(null);

  const logged = useSelector(
    (state: RootState) => state.appController.loggedUser.loggedIn
  );

  const { data, isLoading, isSuccess, isError } = useGetCompositeDataQuery();
  const [postItem, { isSuccess: postSuccess, isError: postError }] =
    usePostItemMutation();
  const [resetMutationState] = useResetMutationStateMutation();
  const [deleteStockItem] = useDeleteStockItemMutation();
  const [updateItem] = useUpdateItemMutation();

  let fetchedAllDataArray: NormalStoreTypes[] = [];

  if (isSuccess) {
    const { itemsData, saleItemsData, stockClearItemsData } = data;
    // destructuring fetched all data and assigned them into one array call `fetchedAllDataArray`
    fetchedAllDataArray = [
      ...itemsData,
      ...saleItemsData,
      ...stockClearItemsData,
    ];
  }

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: "error",
        content: "Item getting failed",
      });
    }
    if (postSuccess) {
      messageApi.open({
        type: "success",
        content: "item reset to normal section successfully!",
      });

      if (deleteCode.current !== null) {
        console.log("enter to ref");

        deleteStockItem(deleteCode.current);
        deleteCode.current = null;
      }
    }
    if (postError) {
      messageApi.open({
        type: "error",
        content: "item reset to normal section failed!",
      });
    }
    resetMutationState(postItem);
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
                  products.status === "sale"
                    ? `${products.salePercentage}% sale`
                    : products.status === "stockClearing"
                    ? "stock clearing"
                    : null
                }
                color={
                  products.status === "sale"
                    ? "yellow"
                    : products.status === "stockClearing"
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
                            // await deleteCompositeData(products.code).unwrap();
                            deleteCode.current = products.id
                              ? products.id
                              : null;
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
                        {products.status === "sale"
                          ? products.salePrice
                          : products.status === "stockClearing"
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
        dataSource={fetchedAllDataArray}
      ></List>
    </div>
  );
};

export { Home };
