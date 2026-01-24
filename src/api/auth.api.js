import { API_URL } from "../config/env";

export const loginUser = async ({ email, password }) => {
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

export const registerUser = async (newUser) => {
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

export const updateUser = async (userId, updatedUser) => {
  const response = await fetch(`${API_URL}/auth/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al actualizar usuario");
  }

  return response.json();
};

export const disableUser = async (userId) => {
  const response = await fetch(`${API_URL}/auth/user/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al eliminar usuario");
  }

  // opcional: devolver true si quieres confirmar
  return true;
};