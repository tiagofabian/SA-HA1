import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminLayout = () => {
    const { isAuthenticated, user, loading } = useAuth();

    // Mostrar loading mientras se verifica
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <span className="ml-3 text-gray-600">Verificando permisos...</span>
            </div>
        );
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
        return <Navigate to="/iniciar-sesion" replace />;
    }

    // Si no es ADMIN, redirigir al home (o página de acceso denegado)
    if (user?.rol !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    // Si es ADMIN, renderizar las rutas hijas
    return <Outlet />;
};

export default AdminLayout;