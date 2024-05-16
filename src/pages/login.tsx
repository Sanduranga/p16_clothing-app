import React from "react";
import { Button, Col, Drawer, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { openDrawer, signInForm } from "../redux/slices/appActions";
import LoginForm from "../components/loginForm";
import SigninForm from "../components/signinForm";

const Login: React.FC = () => {
  const action = useSelector((state: RootState) => state.appController.drawer);
  const signIn = useSelector(
    (state: RootState) => state.appController.signInForm
  );
  const dispatch = useDispatch();

  return (
    <>
      <Drawer
        title={`Hi.. ${signIn ? "signup" : "login"} here.`}
        placement={"left"}
        width={800}
        open={action}
        closable={false}
        style={{
          position: "relative",
          borderRadius: "0 100% 40% 0",
          padding: "0 100px 40px 0",
        }}
        extra={
          <Space>
            <Button onClick={() => dispatch(openDrawer())}>Cancel</Button>
            <Button type="primary">OK</Button>
          </Space>
        }
      >
        <div
          style={{ position: "absolute", width: "60%", padding: "0 50px 0 0" }}
        >
          <Button
            style={{ marginBottom: 10, backgroundColor: "green" }}
            onClick={() => dispatch(openDrawer())}
          >
            Back
          </Button>
          {!signIn ? (
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

export default Login;
