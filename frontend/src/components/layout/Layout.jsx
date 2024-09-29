import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./layout.css";

const Layout = () => {
  return (
      <div className="app">
        <div className="left">
          <Navbar />
        </div>
        <div className="right">
          <Outlet />
        </div>
      </div>
  );
};

export default Layout;
