import { Button, Form, Input } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { userlogingTypes } from "../types/types";
import { useDispatch } from "react-redux";
import { signInForm } from "../redux/slices/appActions";

const SigninForm = () => {
  const dispatch = useDispatch();

  const onSignUp = (data: userlogingTypes) => {
    console.log(data);
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
        <Button style={{ marginRight: 10 }} type="primary" htmlType="submit">
          Signup
        </Button>
        <Button
          onClick={() => dispatch(signInForm(false))}
          type="primary"
          htmlType="submit"
          icon={<RollbackOutlined />}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default SigninForm;
