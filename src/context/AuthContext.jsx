import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginService,
  register as registerService,
  update as updateUserService,
} from "@/services/auth.service";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ← Iniciar en true

  // Cargar usuario desde sessionStorage al iniciar la app
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const raw = sessionStorage.getItem("auth_user");
        if (raw) {
          setUser(JSON.parse(raw));
        }
      } catch (error) {
        console.error("Error al cargar usuario de sessionStorage:", error);
        sessionStorage.removeItem("auth_user"); // Limpiar dato corrupto
      } finally {
        setLoading(false); // ← INDICAR QUE YA TERMINÓ DE CARGAR
      }
    };

    loadUserFromStorage();
  }, []);

  // LOGIN
  const login = async ({ email, password }) => {
    try {
      const data = await loginService({ email, password });
      sessionStorage.setItem("auth_user", JSON.stringify(data));
      setUser(data);
      return { ok: true, user: data };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  };

  // REGISTER
  const register = async (newUser) => {
    try {
      const data = await registerService(newUser);
      sessionStorage.setItem("auth_user", JSON.stringify(data));
      setUser(data);
      return { ok: true, user: data };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  };

  // LOGOUT
  const logout = () => {
    sessionStorage.removeItem("auth_user");
    setUser(null);
    toast.info("Usuario deslogueado");
  };

  // ACTUALIZAR USUARIO EN CONTEXTO
  const updateUserContext = (updatedUser) => {
    sessionStorage.setItem("auth_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading, // ← EXPORTAR loading
        login,
        register,
        logout,
        updateUserContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};