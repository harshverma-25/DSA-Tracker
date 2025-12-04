import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // ❌ Not Logged In → Redirect to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged In → Allow Access
  return children;
};

export default ProtectedRoute;
