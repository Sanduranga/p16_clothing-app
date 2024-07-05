import { Menu, Typography } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../slices/appActions";
import { RootState } from "../redux/store";

const Navbar = () => {
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
            key: "stock-clearing",
          },
        ]}
      />
      <div className="login">
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
