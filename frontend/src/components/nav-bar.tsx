import { Menu, Typography } from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../redux/slices/appActions";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, loggedIn } = useSelector(
    (state: RootState) => state.appController.loggedUser
  );
  const truncatedName = name.split("").slice(0, 5).join("");

  const handleMenuClick = (item: any) => {
    navigate(`/${item.key}`);
  };
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
                label: "Men's Geans",
                key: "mens-geans",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Blouses",
                key: "womens-blouses",
              },
              {
                label: "Women's Geans",
                key: "womens-geans",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Bags",
                key: "womens-bags",
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
        {loggedIn && (
          <>
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
            <Link style={{ textDecoration: "none" }} to={"/my-store"}>
              <Typography.Title
                level={5}
                style={{
                  cursor: "pointer",
                }}
              >
                My store
              </Typography.Title>
            </Link>
          </>
        )}

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
