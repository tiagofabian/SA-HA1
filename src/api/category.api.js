import { API_URL } from "../config/env";
import { getAuthToken } from "@/lib/helpers";

export const getCategoryById = async (id) => {
  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener la categoria (${response.status})`);
  }

  return response.json();
};

export const getAllCategories = async () => {
  const response = await fetch(`${API_URL}/api/category`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al listar las categorias");
  }

  return response.json();
};

export const getCategoriesWithProductsBySlug = async (slugs) => {
  const query = slugs.map((s) => `slugs=${encodeURIComponent(s)}`).join("&");
  const url = `${API_URL}/api/category/filtered-with-products?${query}`;

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error al listar las categorías con productos: ${text}`);
  }

  const data = await response.json();

  return data.map((category) => ({
    ...category,
    products: (category.products ?? []).map((p) => ({
      ...p,
      price: Number(p.price),
      imageUrls: p.imageUrls ?? [],
      category: p.category ?? null,
      collections: p.collections ?? [],
    })),
  }));
};


export const createCategory = async (category) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/category/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Error al crear la categoria");
  }

  return response.json();
};

export const updateCategory = async (id, category) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la categoria");
  }

  return response.json();
};

export const removeCategory = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la categoria");
  }

  return true;
};