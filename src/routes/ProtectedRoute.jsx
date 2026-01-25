import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  // Si no está autenticado, redirige al login
  if (!isAuthenticated || !user) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  return children;
};

export default ProtectedRoute;