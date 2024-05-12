import React from "react";
import { Button, Drawer, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { openDrawer } from "../redux/slices/appActions";

const Login: React.FC = () => {
  const action = useSelector((state: RootState) => state.appController.drawer);
  const dispatch = useDispatch();
  return (
    <>
      <Drawer
        title="Drawer with extra actions"
        placement={"left"}
        width={500}
        open={action}
        closable={false}
        extra={
          <Space>
            <Button onClick={() => dispatch(openDrawer())}>Cancel</Button>
            <Button type="primary">OK</Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Login;
