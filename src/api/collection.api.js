import { API_URL } from "../config/env";

export const getCollectionById = async (id) => {
  const response = await fetch(`${API_URL}/api/collection/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener la coleccion (${response.status})`);
  }

  return response.json();
};

export const getAllCollections = async () => {
  const response = await fetch(`${API_URL}/api/collection`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar las colecciones");
  }

  return response.json();
};

export const createCollection = async (collection) => {
  const response = await fetch(`${API_URL}/api/collection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(collection),
  });

  if (!response.ok) {
    throw new Error("Error al crear la coleccion");
  }

  return response.json();
};

export const updateCollection = async (id, collection) => {
  const response = await fetch(`${API_URL}/api/collection/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(collection),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la coleccion");
  }

  return response.json();
};

export const removeCollection = async (id) => {
  const response = await fetch(`${API_URL}/api/collection/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la coleccion");
  }

  return true;
};