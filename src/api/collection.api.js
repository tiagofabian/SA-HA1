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

export const getCollectionsBySlug = async (slugs) => {
  const query = slugs
    .map((s) => `slugs=${encodeURIComponent(s)}`)
    .join("&");

  const response = await fetch(
    `${API_URL}/api/collection/filtered-without-product?${query}`,
    { method: "GET" }
  );

  if (!response.ok) {
    throw new Error("Error al listar las colecciones sin productos");
  }

  const data = await response.json();

  // No hay productos → retorno directo
  return data.map((collection) => ({
    id: collection.id,
    name: collection.name,
    description: collection.description,
    slug: collection.slug,
    image: collection.image,
  }));
};


export const getCollectionsWithProductsBySlug = async (slugs) => {
  const query = slugs
    .map((s) => `slugs=${encodeURIComponent(s)}`)
    .join("&");

  const response = await fetch(
    `${API_URL}/api/collection/filtered-with-product?${query}`,
    { method: "GET" }
  );

  if (!response.ok) {
    throw new Error("Error al listar las colecciones con productos");
  }

  const data = await response.json();

  return data.map((collection) => ({
    ...collection,
    products: collection.products.map((p) => ({
      ...p,
      price: Number(p.price),
      imageUrls: p.imageUrls ?? [],
      category: p.category ?? null,
      collections: p.collections ?? [],
    })),
  }));
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