import { Badge, Button, Card, Image, List, Typography, message } from "antd";
import {
  useResetMutationStateMutation,
  useGetAllSaleItemsQuery,
  useDeleteSaleItemMutation,
} from "../../api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const SaleItems: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const logged = useSelector(
    (state: RootState) => state.appController.loggedUser.loggedIn
  );

  const { data, isLoading, isSuccess, isError } = useGetAllSaleItemsQuery();
  const [deleteSaleItem, { isSuccess: deleteSuccess, isError: deleteError }] =
    useDeleteSaleItemMutation();
  const [resetMutationState] = useResetMutationStateMutation();

  useEffect(() => {
    try {
      if (isSuccess && data.length === 0) {
        messageApi.open({
          type: "warning",
          content: "No data to get!",
        });
      }
      if (isError) {
        messageApi.open({
          type: "error",
          content: "Item getting failed",
        });
      }
      if (deleteSuccess) {
        messageApi.open({
          type: "success",
          content: "item moved to normal section successfully!",
        });
      }
      if (deleteError) {
        messageApi.open({
          type: "error",
          content: "item moved to normal section failed!",
        });
      }
      resetMutationState(deleteSaleItem);
    } catch (error) {
      console.log("error");

      messageApi.open({
        type: "error",
        content: "Item getting failed!",
      });
    }
  }, [isSuccess, isError, deleteSuccess, deleteError]);

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
                text={`${products.salePercentage.toFixed(1)}% sale`}
                color={"yellow"}
              >
                <Card
                  title={products.items?.itemTitle}
                  style={{ backgroundColor: "#ebeff5" }}
                  actions={[
                    logged && (
                      <Button
                        style={{
                          borderColor: "#0b629c",
                          color: "#cc213b",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          deleteSaleItem(products.items?.code || 0.0); // `deleteSaleItem` can't be undefine.
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
                        Rs. {""}
                        {products.salePrice.toFixed(2)}
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
