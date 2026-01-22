import { API_URL } from "../config/env";
import { getAuthToken } from "@/lib/helpers";

export const getCategoryById = async (id) => {
  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener la categoria (${response.status})`);
  }

  return response.json();
};

export const getAllCategorys = async () => {
  const response = await fetch(`${API_URL}/api/category`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar las categorias");
  }

  return response.json();
};

export const createCategory = async (category) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/category/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Error al crear la categoria");
  }

  return response.json();
};

export const updateCategory = async (id, category) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la categoria");
  }

  return response.json();
};

export const removeCategory = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la categoria");
  }

  return true;
};