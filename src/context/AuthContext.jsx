import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginService,
  register as registerService,
  update as updateUserService, // si quieres usar aquí también
} from "@/services/auth.service";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //  Cargar usuario desde sessionStorage al iniciar la app
  useEffect(() => {
    const raw = sessionStorage.getItem("auth_user");
    if (raw) {
      setUser(JSON.parse(raw));
    }
  }, []);

  //  LOGIN
  const login = async ({ email, password }) => {
    try {
      const data = await loginService({ email, password });
      // data = { id, name, email, rol, token }

      sessionStorage.setItem("auth_user", JSON.stringify(data));
      setUser(data);

      return { ok: true, user: data };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  };

  //  REGISTER
  const register = async (newUser) => {
    try {
      const data = await registerService(newUser);
      // data = { id, name, email, rol, token }

      sessionStorage.setItem("auth_user", JSON.stringify(data));
      setUser(data);

      return { ok: true, user: data };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  };

  //  LOGOUT
  const logout = () => {
    sessionStorage.removeItem("auth_user");
    setUser(null);
    toast.info("Usuario deslogueado");
  };

  //  ACTUALIZAR USUARIO EN CONTEXTO
  const updateUserContext = (updatedUser) => {
    // updatedUser = { id, name, email, rol, token }
    sessionStorage.setItem("auth_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUserContext, // <-- nuevo método
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🪝 Hook para consumir el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};