import { Navigate} from "react-router-dom";
import AuthContext from "./authContext";
import { useContext } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  
  const context = useContext(AuthContext);
  const { authToken } = context;
  
  if(authToken.isLoading){
    return (<div>Loading...</div>)
  }

  if (!authToken.token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authToken.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children
};

export default ProtectedRoute;
