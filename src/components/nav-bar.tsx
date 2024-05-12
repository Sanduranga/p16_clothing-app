import { Menu, Typography } from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { openDrawer } from "../redux/slices/appActions";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleMenuClick = () => {};
  const handlelogin = () => {
    dispatch(openDrawer());
  };
  return (
    <div className="navBar">
      <Menu
        className="appMenu"
        onClick={handleMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "womens-watches",
              },
              {
                label: "Women's Bags",
                key: "womens-bags",
              },
              {
                label: "Women's Jewellery",
                key: "womens-jewellery",
              },
            ],
          },
          {
            label: "Kids",
            key: "kids",
            children: [
              {
                label: "Kids Dresses",
                key: "kids-dresses",
              },
              {
                label: "Kids Shoes",
                key: "kids-shoes",
              },
              {
                label: "Kids Watches",
                key: "kids-watches",
              },
              {
                label: "Kids Bags",
                key: "kids-bags",
              },
            ],
          },
          {
            label: "Sale",
            key: "sale",
          },
        ]}
      />
      <Typography.Title level={2}>Entgra Store</Typography.Title>
      <div className="cartLogin">
        <Typography.Title style={{ cursor: "pointer" }} level={2}>
          <ShoppingCartOutlined />
        </Typography.Title>
        <Typography.Title
          onClick={handlelogin}
          style={{ cursor: "pointer" }}
          level={5}
        >
          login
        </Typography.Title>
      </div>
    </div>
  );
};

export default Navbar;
