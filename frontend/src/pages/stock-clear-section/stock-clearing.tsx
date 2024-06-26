import { Badge, Button, Card, Image, List, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useGetAllSalesItemsQuery } from "../../api/rtkApi";
import { RootState } from "../../redux/store";

const StockClearingItems: React.FC = () => {
  const { data, isLoading } = useGetAllSalesItemsQuery();
  // const logged = useSelector(
  //   (state: RootState) => state.appController.loggedUser.loggedIn
  // );
  // const navigate = useNavigate();
  // console.log("saleitems page");

  return (
    <div>
      <List
        loading={isLoading}
        grid={{
          gutter: 16,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 3,
          xxl: 6,
        }}
        renderItem={(products, index) => {
          return (
            <div style={{ margin: 20 }}>
              <List.Item key={index}>
                <Badge.Ribbon text={"stockclear"} color={"red"}>
                  <Card
                    title={products.itemTitle}
                    actions={[<ShoppingCartOutlined />]}
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
                          {products.salePrice}
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
              </List.Item>
            </div>
          );
        }}
        dataSource={data}
      ></List>
    </div>
  );
};

export { StockClearingItems };
