import { Card, Image, List, Typography } from "antd";
import { useGetAllItemsQuery } from "../redux/rtkApi";
import Login from "./login";
import { useNavigate } from "react-router-dom";

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
              cover={
                <Image
                  preview={false}
                  className="itemCardImage"
                  src={"bag.jpg"}
                />
              }
              onClick={() => navigate(`/clicked-item/${"3"}`)}
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
