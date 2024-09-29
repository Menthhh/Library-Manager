import React, { useContext } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/useAuth";
import mscLogo from "../../assets/msc_logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleNavigation = (page) => {
    navigate(`/${page}`);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };


  console.log(user);

  return (
    <div className="navbar">
      <div className="profile">
        <img
          src={mscLogo}
          alt=""
        />
        <p className="userName">{ user.others.username }</p>
        <hr />
      </div>
      <ul className="list">
        <li className="list-item" onClick={() => handleNavigation("")}>
          Dashboard
        </li>
        <li className="list-item" onClick={() => handleNavigation("borrow")}>
          Borrow/Return
        </li>

        <li className="list-item" onClick={() => handleNavigation("donate")}>
          Donate
        </li>
        <li className="list-item" onClick={() => handleNavigation("inventory")}>
          Inventory
        </li>
      </ul>
      <p className="logout" onClick={handleLogout}>Logout</p>
    </div>
  );
}
