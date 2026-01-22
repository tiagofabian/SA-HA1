import { API_URL } from "../config/env";

export const getAddressById = async (id) => {
  const response = await fetch(`${API_URL}/api/address/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener la direccion (${response.status})`);
  }

  return response.json();
};

export const getAllAddresss = async () => {
  const response = await fetch(`${API_URL}/api/address`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar las direcciones");
  }

  return response.json();
};

export const createAddress = async (address) => {
  const response = await fetch(`${API_URL}/api/address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(address),
  });

  if (!response.ok) {
    throw new Error("Error al crear la direccion");
  }

  return response.json();
};

export const updateAddress = async (id, address) => {
  const response = await fetch(`${API_URL}/api/address/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(address),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la direccion");
  }

  return response.json();
};

export const removeAddress = async (id) => {
  const response = await fetch(`${API_URL}/api/address/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la direccion");
  }

  return true;
};