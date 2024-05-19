import { Carousel, Col, Image, Row, Spin, message } from "antd";
import React from "react";
import Navbar from "../components/nav-bar";
import ItemDescription from "../components/item-description";
import { useGetOneItemQuery } from "../redux/rtkApi";
import { useParams } from "react-router-dom";

const contentStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 0,
  height: "360px",
  background: "#325452",
};
const ClickedItemPage: React.FC = () => {
  const { code } = useParams<{ code: "string" }>();
  const { data, isLoading, error } = useGetOneItemQuery(code!, {
    skip: !code,
  });
  if (error) {
    message.open({
      type: "error",
      content: "Item getting error!",
    });
  }
  return (
    <>
      <Navbar />
      {isLoading ? (
        <Spin tip="Loading" size="large" fullscreen={true} />
      ) : (
        <Row
          style={{ marginTop: 20, padding: "0 20px" }}
          gutter={[20, { sm: 20, xs: 20 }]}
        >
          <Col sm={24} md={12} lg={12}>
            <Carousel arrows infinite={false}>
              <div>
                <div style={contentStyle}>
                  <Image className="clickedImage" src={"/bag.jpg"} />
                </div>
              </div>
              <div>
                <h3 style={contentStyle}>cacfsa</h3>
              </div>
              <div>
                <h3 style={contentStyle}></h3>
              </div>
              <div>
                <h3 style={contentStyle}></h3>
              </div>
            </Carousel>
          </Col>
          <Col flex={"auto"} sm={24} md={12} lg={12}>
            {data && <ItemDescription data={data} />}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ClickedItemPage;
