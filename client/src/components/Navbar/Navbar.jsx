import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="navbar">
      <div className="profile">
        <img
          src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
          alt=""
        />
        <p className="userName">John Doe</p>
        <hr />
      </div>
      <ul className="list">
        <li className="list-item" onClick={() => handleNavigation("dashboard")}>
          Dashboard
        </li>
        <li className="list-item" onClick={() => handleNavigation("borrow")}>
          Borrow
        </li>
        <li className="list-item" onClick={() => handleNavigation("return")}>
          Return
        </li>
        <li className="list-item" onClick={() => handleNavigation("donate")}>
          Donate
        </li>
      </ul>
      <p className="logout">Logout</p>
    </div>
  );
}
