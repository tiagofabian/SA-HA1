import { API_URL } from "../config/env";

// Obtener por ID
export const getCustomerById = async (id) => {
  const response = await fetch(`${API_URL}/api/customers/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener usuario (${response.status})`);
  }

  return response.json();
};

// Obtener por Email
export const getCustomerByEmail = async (email) => {
  const response = await fetch(`${API_URL}/api/customers/${encodeURIComponent(email)}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener usuario (${response.status})`);
  }

  return response.json();
};

// Obtener todos
export const getAllCustomers = async () => {
  const response = await fetch(`${API_URL}/api/customers`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar usuarios");
  }

  return response.json();
};

// Crear usuario
export const createCustomer = async (customer) => {
  const response = await fetch(`${API_URL}/api/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Error al crear usuario");
  }

  return response.json();
};

// Actualizar usuario
export const updateCustomer = async (id, customer) => {
  const response = await fetch(`${API_URL}/api/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar usuario");
  }

  return response.json();
};

// Eliminar usuario
export const removeCustomer = async (id) => {
  const response = await fetch(`${API_URL}/api/customers/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar usuario");
  }

  return true;
};