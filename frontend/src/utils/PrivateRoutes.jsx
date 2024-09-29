import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  
  const isAuthenticated = user !== null; // Check if user exists
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
