import { Card, Image, List, Typography } from "antd";
import { useGetAllproductsQuery } from "../redux/rtkApi";
import Login from "./login";

const Home: React.FC = () => {
  const { data, isLoading } = useGetAllproductsQuery();

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
              cover={<Image className="itemCardImage" src={"bag.jpg"} />}
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
