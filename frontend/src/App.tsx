import { useRoutes } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/nav-bar";
import { router } from "./routes";
import { LoginPage } from "./pages/log-in";

function App() {
  const element = useRoutes(router);
  return (
    <>
      <Navbar />
      <LoginPage />
      {element}
    </>
  );
}

export default App;
