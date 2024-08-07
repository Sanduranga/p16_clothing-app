import React from "react";
import { Button, Col, Drawer, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { loggedIn, openDrawer, signInForm } from "../../slices/appActions";
import LoginForm from "./sub-components/login-form";
import SigninForm from "./sub-components/signinForm";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const action = useSelector((state: RootState) => state.appController.drawer);
  const signIn = useSelector(
    (state: RootState) => state.appController.signInForm
  );
  const logged = useSelector(
    (state: RootState) => state.appController.loggedUser.loggedIn
  );
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(openDrawer());
  };

  return (
    <>
      <Drawer
        title={`Hi..👋 ${
          signIn ? "signup here." : logged ? "" : "login here."
        } `}
        placement={"left"}
        width={800}
        open={action}
        onClose={onClose}
        closable={false}
        style={{
          position: "relative",
          borderRadius: "0 100% 40% 0",
          padding: "0 100px 40px 0",
        }}
      >
        <div
          style={{ position: "absolute", width: "60%", padding: "0 50px 0 0" }}
        >
          <Button
            style={{ marginBottom: 10 }}
            onClick={() => dispatch(openDrawer())}
            type="primary"
          >
            Back
          </Button>
          {logged ? (
            <Button
              style={{ marginBottom: 10, marginLeft: 10 }}
              onClick={() => {
                dispatch(loggedIn(false));
                navigate("/");
              }}
              danger
            >
              Sign out
            </Button>
          ) : !signIn ? (
            <Col>
              <LoginForm />
              <Typography.Title level={4}>create an account?</Typography.Title>
              <Button
                onClick={() => dispatch(signInForm(true))}
                type="primary"
                htmlType="submit"
              >
                Signup
              </Button>
            </Col>
          ) : (
            <SigninForm />
          )}
        </div>
      </Drawer>
    </>
  );
};
