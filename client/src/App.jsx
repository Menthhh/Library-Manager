
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Donate from "./pages/donate/Donate";
import Borrow from "./pages/borrow/Borrow";
import Login from "./pages/login/Login";
import Register from './pages/register/Register';

function App() {
  return (
    <>
      <Login />
      {/* <BrowserRouter>
          <div className="app">
            <div className="left">
              <Navbar />
            </div>
            <div className="right">
            <Routes>
              <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/borrow" element={<Borrow />} />
              </Routes>
            </div>
          </div>

      </BrowserRouter> */}
    </>
  );
}

export default App;
