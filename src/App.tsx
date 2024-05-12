import { Typography } from "antd";
import "./App.css";

function App() {
  const { Title } = Typography;
  return (
    <>
      <Typography>Hi</Typography>
      <Title level={5}>Hey</Title>
    </>
  );
}

export default App;
