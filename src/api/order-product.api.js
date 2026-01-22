import { API_URL } from "../config/env";

export const getOrderProductById = async (id) => {
  const response = await fetch(`${API_URL}/api/order_product/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener la orden (${response.status})`);
  }

  return response.json();
};

export const getAllOrderProducts = async () => {
  const response = await fetch(`${API_URL}/api/order_product`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar las ordenes");
  }

  return response.json();
};

export const createOrderProduct = async (order_product) => {
  const response = await fetch(`${API_URL}/api/order_product/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order_product),
  });

  if (!response.ok) {
    throw new Error("Error al crear la orden");
  }

  return response.json();
};

export const updateOrderProduct = async (id, order_product) => {
  const response = await fetch(`${API_URL}/api/order_product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order_product),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la orden");
  }

  return response.json();
};

export const removeOrderProduct = async (id) => {
  const response = await fetch(`${API_URL}/api/order_product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la orden");
  }

  return true;
};