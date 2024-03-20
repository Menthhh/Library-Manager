import "./login.css";
import GoogleImg from "../../icons/google.png";
import backGround from "../../assets/background.jpg";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from './../../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }
  const success = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  }

  const handleClick = () => {
    navigate("/register");
  }

  return (
    <>
      { success ? (
        <div className="success-dialog">
          <p>Registration successful</p>
        </div>):(
      
    <div className="loginWraper">
      <img src={backGround} alt="background" className="backgroundImg" />
      <div className="wrapper">
        <h1>MSC Library</h1>
        <h1>Log In</h1>
        <div className="loginForm">
          <input
            type="text"
                  className="email"
                  name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <input
            type="password"
                  className="password"
                  name="password"
            placeholder="password"
            onChange={handleChange}
                />
                 {error && <p>{error.message}</p>}
        </div>
        {error && <p className="error">{error}</p>}
        <button className="SigininBtn" onClick={handleSubmit}>Sign In</button>
        <span className="LogInbtnGoogle" onClick={() => console.log("clicked")}>
          <img src={GoogleImg} alt="Google" className="googleLogo" />
          <p>Sign in with Google</p>
        </span>

        <span className="footer">
          <p onClick={handleClick}>Don't have an account?</p>
          <p>Forget password ?</p>
        </span>
      </div>
      </div>
        )}
      </>
  );
}
