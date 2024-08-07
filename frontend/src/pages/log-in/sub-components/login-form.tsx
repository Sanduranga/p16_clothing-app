import { Button, Form, Input, message } from "antd";
import { userlogingTypes } from "../../../types/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loggedIn, openDrawer, setUserName } from "../../../slices/appActions";

const LoginForm: React.FC = () => {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  const onLogin = async (data: userlogingTypes) => {
    // here I use javascript default fetch api to deal with backend..
    try {
      setLoad(true);
      const res = await fetch(
        `http://localhost:8080/api/users/get-user?email=${data.email}&password=${data.password}`
      );
      const loggedUser = await res.json();

      if (loggedUser.name) {
        setLoad(false);
        dispatch(openDrawer());
        dispatch(loggedIn(true));
        dispatch(setUserName(loggedUser.name));
        message.open({
          type: "success",
          content: "Logged in successfully!",
        });
      }
      if (res.status === 401) {
        setLoad(false);
        message.open({
          type: "error",
          content: "Incorrect password!",
        });
      } else if (!res.ok) {
        setLoad(false);
        message.open({
          type: "error",
          content: "Something went wrong!",
        });
      }
    } catch (error) {
      setLoad(false);
      message.open({
        type: "error",
        content: "Loging failed!",
      });
    }
  };

  return (
    <>
      <Form style={{}} onFinish={onLogin}>
        <Form.Item
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
          name="email"
        >
          <Input placeholder="Enter your email.." />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
          name="password"
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Button loading={load} type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
