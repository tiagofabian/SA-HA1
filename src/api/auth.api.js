import { API_URL } from "../config/env";

export const loginFetch = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email y contraseña son obligatorios");
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  return response.json();
};

export const registerFetch = async (newUser) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("Error al registrar usuario");
  }

  return response.json();
};