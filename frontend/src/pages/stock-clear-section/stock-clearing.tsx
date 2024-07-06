import { Badge, Button, Card, Image, List, Typography, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  useDeleteStockClearItemMutation,
  useGetAllStockClearItemsQuery,
  useResetMutationStateMutation,
} from "../../api";
import { useEffect } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const StockClearingItems: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const logged = useSelector(
    (state: RootState) => state.appController.loggedUser.loggedIn
  );

  const { data, isLoading, isError } = useGetAllStockClearItemsQuery();
  const [
    deleteStockClearItem,
    { isSuccess: deleteSuccessStockItm, isError: deleteErrorStockItm },
  ] = useDeleteStockClearItemMutation();
  const [resetMutationState] = useResetMutationStateMutation();

  useEffect(() => {
    // for handling status messages
    if (isError) {
      messageApi.open({
        type: "error",
        content: "Item getting failed",
      });
    }
    if (deleteSuccessStockItm) {
      messageApi.open({
        type: "success",
        content: "item reset to normal section successfully!",
      });
    }
    if (deleteErrorStockItm) {
      messageApi.open({
        type: "error",
        content: "item reset to normal section failed!",
      });
    }
    resetMutationState(deleteStockClearItem);
  }, [isError, deleteSuccessStockItm, deleteErrorStockItm]);

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
              <Badge.Ribbon text={"stockclear"} color={"red"}>
                <Card
                  title={products.items?.itemTitle}
                  style={{ backgroundColor: "#ebeff5" }}
                  actions={[
                    <ShoppingCartOutlined />,
                    logged && (
                      <Button
                        type="primary"
                        style={{ padding: 2 }}
                        onClick={() => {
                          try {
                            deleteStockClearItem(products.items?.code || 0.0); // `deleteStockClearItem` can't be undefine.
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
                      <>
                        <Typography.Text strong>
                          Quantity: {""}
                          {products.items?.numberOfItems}
                        </Typography.Text>
                        <Typography.Paragraph
                          ellipsis={{
                            rows: 1,
                            expandable: true,
                            symbol: "more",
                          }}
                        >
                          {products.items?.description}
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

export { StockClearingItems };
