import { API_URL } from "../config/env";
import { getAuthToken } from "@/lib/helpers";

export const getCollectionById = async (id) => {
  const response = await fetch(`${API_URL}/api/collection/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener la collección (${response.status})`);
  }

  return response.json();
};

export const getAllCollections = async () => {
  const response = await fetch(`${API_URL}/api/collection`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar las collecciónes");
  }

  return response.json();
};

export const createCollection = async (collection) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/collection/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(collection),
  });

  if (!response.ok) {
    throw new Error("Error al crear la collección");
  }

  return response.json();
};

export const updateCollection = async (id, collection) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/collection/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(collection),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la collección");
  }

  return response.json();
};

export const removeCollection = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/collection/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la collección");
  }

  return true;
};