import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./authContext";
import { useContext } from "react";

const ProtectedRoute = () => {
  const context = useContext(AuthContext);
  const {authToken} = context;
  setTimeout(() => {
    console.log("Auth Token in Protected Route: ", authToken);
  }, 2000);
  const token = localStorage.getItem("authToken");
  console.log("Protected Route Token: ", token , authToken);
  return (token !== undefined || token !== null) || (authToken !== undefined || authToken !== null) ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
