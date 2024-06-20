import { Button, Card, Image, List, Rate, Typography } from "antd";
import { useGetAllSalesItemsQuery } from "../redux/rtkApi";
import Login from "./login";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Navbar from "../layers/nav-bar";

const SaleItems: React.FC = () => {
  const { data, isLoading } = useGetAllSalesItemsQuery();
  const logged = useSelector(
    (state: RootState) => state.appController.loggedUser.loggedIn
  );
  const navigate = useNavigate();
  console.log("saleitems page");

  return (
    <div>
      <Navbar />
      <List
        loading={isLoading}
        grid={{ column: 3 }}
        renderItem={(products, index) => {
          return (
            <Card
              className="itemCard"
              title={products.itemTitle}
              key={index}
              actions={[
                <Rate allowHalf disabled value={4} />,
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
                    Price: ${products.sellingPrice}
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
          );
        }}
        dataSource={data}
      ></List>
      <Login />
    </div>
  );
};

export default SaleItems;
