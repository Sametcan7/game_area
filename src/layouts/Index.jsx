import { Outlet } from "react-router-dom";
import Header from "./Header";

function Index() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Index;
