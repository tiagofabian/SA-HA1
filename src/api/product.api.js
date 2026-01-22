import { API_URL } from "../config/env";
import { getAuthToken } from "@/lib/helpers";


// Buscar productos por término
export const searchProducts = async (term) => {
  const response = await fetch(`${API_URL}/api/product/search?term=${encodeURIComponent(term)}`, {
    method: "GET",
  });

  if (!response.ok) throw new Error("Error al buscar productos");

  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/api/product/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener producto (${response.status})`);
  }

  return response.json();
};

export const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/api/product`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar productos");
  }

  return response.json();
};

export const createProduct = async (product) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/product/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error al crear producto");
  }

  return response.json();
};

export const updateProduct = async (id, product) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar producto");
  }

  return response.json();
};

export const removeProduct = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar producto");
  }

  return true;
};