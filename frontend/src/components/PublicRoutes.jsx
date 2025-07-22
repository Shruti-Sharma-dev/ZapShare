// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
