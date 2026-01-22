import { API_URL } from "../config/env";

export const getOrderById = async (id) => {
  const response = await fetch(`${API_URL}/api/order/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener la orden (${response.status})`);
  }

  return response.json();
};

export const getAllOrders = async () => {
  const response = await fetch(`${API_URL}/api/order`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar las ordenes");
  }

  return response.json();
};

export const createOrder = async (order) => {
  const response = await fetch(`${API_URL}/api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Error al crear la orden");
  }

  return response.json();
};

export const updateOrder = async (id, order) => {
  const response = await fetch(`${API_URL}/api/order/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la orden");
  }

  return response.json();
};

export const removeOrder = async (id) => {
  const response = await fetch(`${API_URL}/api/order/${id}`, {
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