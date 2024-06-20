import { Button, Form, Input, Select, message } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { userlogingTypes } from "../types/types";
import { useDispatch } from "react-redux";
import { signInForm } from "../redux/slices/appActions";
import { useState } from "react";

const SigninForm = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");

  const onSignUp = async (data: userlogingTypes) => {
    setLoad(true);
    const res = await fetch("http://localhost:8080/api/users/add-user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        userType: userType,
      }),
    });
    if (res.ok) {
      setLoad(false);
      message.open({
        type: "success",
        content: "Registered successfully!",
      });
    }
    if (!res.ok) {
      setLoad(false);
      message.open({
        type: "error",
        content: "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <Form onFinish={onSignUp}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your full name",
            },
          ]}
          name="name"
        >
          <Input placeholder="Enter your full name.." />
        </Form.Item>
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
        <Form.Item>
          <Select
            defaultValue="buyer"
            style={{ width: 120 }}
            onChange={(value) => setUserType(value as "buyer" | "seller")}
            options={[
              { value: "buyer", label: "Buyer" },
              { value: "seller", label: "Seller" },
            ]}
          />
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
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your password again",
            },
          ]}
          name="password"
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          htmlType="submit"
          loading={load}
        >
          Signup
        </Button>
        <Button
          onClick={() => dispatch(signInForm(false))}
          type="primary"
          icon={<RollbackOutlined />}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default SigninForm;
