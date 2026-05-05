import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("adminAuth") === "true";
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
};

export default AdminProtectedRoute;