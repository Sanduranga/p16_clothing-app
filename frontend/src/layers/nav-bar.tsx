import { Menu, Typography } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../redux/slices/appActions";
import { RootState } from "../redux/store";

const Navbar = () => {
  // const { login, register, isAuthenticated, logout } = useKindeAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn, name } = useSelector(
    (state: RootState) => state.appController.loggedUser
  );

  // get name and then convert into array -> get five elements -> finaly convert to string again
  const truncatedName = name.split("").slice(0, 5).join("");

  const handleMenuClick = (item: any) => {
    navigate(`/${item.key}`);
  };
  const handlelogin = () => {
    dispatch(openDrawer());
  };

  // const registerfunc = () => {
  //   register();
  // };
  // const loginfunc = () => {
  //   if (isAuthenticated) {
  //     logout();
  //   } else {
  //     login();
  //   }
  // };

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
            label: "Sale",
            key: "sale",
          },
          {
            label: "Stock clearing",
            key: "StockClearing",
          },
        ]}
      />
      <Typography.Title level={2}>Entgra Store</Typography.Title>
      <div className="cartLogin">
        {/* <Typography.Title style={{ cursor: "pointer" }} level={2}>
          <ShoppingCartOutlined />
        </Typography.Title> */}
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
        {/* 
        <Button onClick={registerfunc}>Register</Button>
        <Button onClick={loginfunc}>
          {isAuthenticated ? `Log out` : `Log In`}
        </Button> */}
      </div>
    </div>
  );
};

export default Navbar;
