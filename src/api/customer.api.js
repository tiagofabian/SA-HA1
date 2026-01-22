import { API_URL } from "../config/env";
import { getAuthToken } from "@/lib/helpers";

// Obtener por ID
export const getCustomerById = async (id) => {
  const response = await fetch(`${API_URL}/api/customer/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener usuario (${response.status})`);
  }

  return response.json();
};

// Obtener por Email
export const getCustomerByEmail = async (email) => {
  const response = await fetch(`${API_URL}/api/customer/email/${encodeURIComponent(email)}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener usuario (${response.status})`);
  }

  return response.json();
};

// Obtener todos
export const getAllCustomers = async () => {
  const response = await fetch(`${API_URL}/api/customer`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar usuarios");
  }

  return response.json();
};

// Crear usuario
// export const createCustomer = async (customer) => {
//   const response = await fetch(`${API_URL}/api/customer/create`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(customer),
//   });

//   if (!response.ok) {
//     throw new Error("Error al crear usuario");
//   }

//   return response.json();
// };

// Actualizar usuario
export const updateCustomer = async (id, customer) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/customer/${id}`, {
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
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/customer/${id}`, {
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