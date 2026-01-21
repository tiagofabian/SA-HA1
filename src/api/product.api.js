import { API_URL } from "../config/env";

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener producto (${response.status})`);
  }

  return response.json();
};

export const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar productos");
  }

  return response.json();
};

export const createProduct = async (product) => {
  const response = await fetch(`${API_URL}/api/products`, {
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
  const response = await fetch(`${API_URL}/api/products/${id}`, {
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
  const response = await fetch(`${API_URL}/api/products/${id}`, {
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