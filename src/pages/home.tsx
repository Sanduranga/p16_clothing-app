import { Button, Card, Image, List, Rate, Typography } from "antd";
import { useGetAllItemsQuery } from "../redux/rtkApi";
import Login from "./login";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Home: React.FC = () => {
  const { data, isLoading } = useGetAllItemsQuery();
  const navigate = useNavigate();
  return (
    <div>
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
                <Button onClick={() => navigate(`/set-discount/${"1"}`)}>
                  Set discount
                </Button>,
              ]}
              cover={
                <Image
                  preview={false}
                  className="itemCardImage"
                  src={"bag.jpg"}
                  onClick={() => navigate(`/clicked-item/${"1"}`)}
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

export default Home;
