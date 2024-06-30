import { Badge, Button, Card, Image, List, Typography, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  useGetAllItemsQuery,
  useResetMutationStateMutation,
  useUpdateItemMutation,
} from "../../api";
import { useEffect } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const StockClearingItems: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const logged = useSelector(
    (state: RootState) => state.appController.loggedUser.loggedIn
  );

  const { data, isLoading, isError } = useGetAllItemsQuery();
  const [updateItem, { isSuccess: updateSuccess, isError: updateError }] =
    useUpdateItemMutation();
  const [resetMutationState] = useResetMutationStateMutation();

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: "error",
        content: "Item getting failed",
      });
    }
    if (updateSuccess) {
      messageApi.open({
        type: "success",
        content: "item reset to normal section successfully!",
      });
    }
    if (updateError) {
      messageApi.open({
        type: "error",
        content: "item reset to normal section failed!",
      });
    }
    resetMutationState(updateItem);
  }, [isError, updateSuccess, updateError]);

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
              {products.status === "saleStore" ? (
                <Badge.Ribbon text={"stockclear"} color={"red"}>
                  <Card
                    title={products.itemTitle}
                    actions={[
                      <ShoppingCartOutlined />,
                      logged && (
                        <Button
                          type="primary"
                          style={{ padding: 2 }}
                          onClick={() => {
                            updateItem({
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
                            });
                          }}
                        >
                          Undo discount
                        </Button>
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
                          {products.stockClearingPrice}
                        </Typography.Paragraph>
                      }
                      description={
                        <Typography.Paragraph
                          ellipsis={{
                            rows: 2,
                            expandable: true,
                            symbol: "more",
                          }}
                        >
                          {products.description}
                        </Typography.Paragraph>
                      }
                    ></Card.Meta>
                  </Card>
                </Badge.Ribbon>
              ) : null}
            </List.Item>
          );
        }}
        dataSource={data}
      ></List>
    </div>
  );
};

export { StockClearingItems };
