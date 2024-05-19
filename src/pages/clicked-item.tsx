import { Carousel, Col, Image, Row } from "antd";
import React from "react";
import Navbar from "../components/nav-bar";
import ItemDescription from "../components/item-description";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "360px",
  color: "#dfe305",
  lineHeight: "60px",
  textAlign: "center",
  background: "#325452",
};
const ClickedItemPage: React.FC = () => {
  return (
    <>
      <Navbar />

      <Row
        style={{ marginTop: 20, padding: "0 20px" }}
        gutter={[20, { sm: 20, xs: 20 }]}
      >
        <Col sm={24} md={12} lg={12}>
          <Carousel arrows infinite={false}>
            <div>
              <h3 style={contentStyle}>
                <Image className="itemCardImage" src={"bag.jpg"} />
              </h3>
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
          <ItemDescription />
        </Col>
      </Row>
    </>
  );
};

export default ClickedItemPage;
