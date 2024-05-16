import { Menu, Typography } from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../redux/slices/appActions";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { name, loggedIn } = useSelector(
    (state: RootState) => state.appController.loggedUser
  );
  const truncatedName = name.split("").slice(0, 5).join("");

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
        <Link style={{ textDecoration: "none" }} to={"/add-items"}>
          <Typography.Title
            level={5}
            style={{
              cursor: "pointer",
            }}
          >
            Add items
          </Typography.Title>
        </Link>

        <Typography.Title
          onClick={handlelogin}
          style={{ cursor: "pointer" }}
          level={5}
        >
          {loggedIn ? `Hi ${truncatedName}` : "Login"}
        </Typography.Title>
      </div>
    </div>
  );
};

export default Navbar;
