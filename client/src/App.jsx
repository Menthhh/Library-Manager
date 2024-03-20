import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Donate from "./pages/donate/Donate";
import Borrow from "./pages/borrow/Borrow";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Layout from "./components/layout/Layout";
import PrivateRoutes from "./utils/PrivateRoutes";
import Inventory from './pages/inventory/Inventory';

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoutes />}>
            <Route element={<Layout />}>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="donate" element={<Donate />} />
            <Route path="borrow" element={<Borrow />} />
            <Route path="inventory" element={<Inventory />} />
            </Route>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
