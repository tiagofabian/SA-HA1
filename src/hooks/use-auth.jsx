import { useState } from "react";
import { login as loginService, register as registerService } from "@/services/auth.service";

export function useAuth() {
  const [user, setUser] = useState(() => {
    const raw = sessionStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = async (email, password) => {
    try {
      const data = await loginService({ email, password });
      sessionStorage.setItem("auth_user", JSON.stringify(data.user));
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  };

  const register = async (newUser) => {
    try {
      const data = await registerService(newUser);
      sessionStorage.setItem("auth_user", JSON.stringify(data.user));
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  };

  const logout = () => {
    sessionStorage.removeItem("auth_user");
    setUser(null);
  };

  return { user, isAuthenticated: !!user, login, register, logout };
}