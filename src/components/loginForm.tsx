import { Button, Form, Input } from "antd";
import { userlogingTypes } from "../types/types";

const LoginForm = () => {
  const onSubmit = (data: userlogingTypes) => {
    console.log(data);
  };
  return (
    <>
      <Form style={{}} onFinish={onSubmit}>
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
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
