import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import backGround from "../../assets/background.jpg";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPasswordMismatchDialog, setShowPasswordMismatchDialog] =
    useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      setShowPasswordMismatchDialog(true);
      return; // Prevent submission if passwords don't match
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        phone_number: phone, // Ensure to match the field name expected by the server
        password,
        confirmPassword,
      });

      // Handle response accordingly
      console.log("Registration successful", response.data);
      setSuccess(true);
    } catch (error) {
      // Handle error
      setError(error.response.data.message);
      console.error("Error registering:", error);
    }
  };

    function handleClick() {
        navigate("/login");
    }
    
  return (
    <div className="loginpage">
      {success && (
        <div className="success-dialog">
          <p>Registration successful</p>
        </div>
      )}
      <div className="loginWraper">
        <img src={backGround} alt="background" className="backgroundImg" />
        <div className="wrapper">
          <h1>Sign up</h1>
          {error && <p className="error">{error}</p>}
          <form className="loginForm" onSubmit={handleSubmit}>
            <input
              type="text"
              className="usernameOremail"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className="usernameOremail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="numberIn"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="submitBtn">
              Submit
            </button>
          </form>

          <span className="footer">
            <p onClick={handleClick}>Already have an account ?</p>
          </span>
        </div>
      </div>
    </div>
  );
}
