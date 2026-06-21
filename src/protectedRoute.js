import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./authContext";
import { useContext } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {

  const context = useContext(AuthContext);
  const { authToken } = context;
  const location = useLocation();

  if (authToken.isLoading) {
    return (<div>Loading...</div>)
  }

  if (!authToken.token) {
    return <Navigate to="/login" replace />;
  }
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  if (user && user.status === "inactive") {
    const isAllowedPath =
      location.pathname.endsWith("/dashboard") ||
      location.pathname.endsWith("/profile") ||
      location.pathname.endsWith("/settings");

    if (!isAllowedPath) {
      const dashboardPath = `/${authToken.role || user.role}/dashboard`;
      return <Navigate to={dashboardPath} replace />;
    }
  }

  if (allowedRoles && !allowedRoles.includes(authToken.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children
};

export default ProtectedRoute;
