import { Badge, Button, Card, Image, List, Rate, Typography } from "antd";
import { useGetCompositeDataQuery } from "../redux/rtkApi";
import Login from "./login";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchedAllDataArray } from "../components/stock-generator";

const Home: React.FC = () => {
  const { data, isLoading, isSuccess } = useGetCompositeDataQuery();

  let fetchedAllDataArray = [] as fetchedAllDataArray[];

  if (isSuccess) {
    const { itemsData, saleItemsData, stockClearItemsData } = data;
    // destructuring fetched all data and assigned them into one array call `fetchedAllDataArray`
    fetchedAllDataArray = [
      ...itemsData,
      ...saleItemsData,
      ...stockClearItemsData,
    ];
  }

  const logged = useSelector(
    (state: RootState) => state.appController.loggedUser.loggedIn
  );
  const navigate = useNavigate();

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
          xl: 3,
          xxl: 6,
        }}
        renderItem={(products, index) => {
          return (
            <List.Item key={index}>
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
                    logged && (
                      <Button
                        onClick={() => navigate(`/set-discount/${products.id}`)}
                      >
                        Set discount
                      </Button>
                    ),
                  ]}
                  cover={
                    <Image
                      preview={false}
                      className="itemCardImage"
                      src={"bag.jpg"}
                      onClick={() => navigate(`/clicked-item/${products.id}`)}
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
                          : products.sellingPrice}
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
      <Login />
    </div>
  );
};

export default Home;
