import { API_URL } from "../config/env";
import { getAuthToken } from "@/lib/helpers";

/* =========================
   OBTENER TODAS
========================= */
export const getAllProductCollections = async () => {
  const response = await fetch(`${API_URL}/api/product_collection`);

  if (!response.ok) {
    throw new Error("Error al listar product-collection");
  }

  return response.json();
};

/* =========================
   OBTENER POR IDs
========================= */
export const getProductCollectionByIds = async (
  productId,
  collectionId
) => {
  const response = await fetch(
    `${API_URL}/api/product_collection/product/${productId}/collection/${collectionId}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener la relación product-collection");
  }

  return response.json();
};

/* =========================
   CREAR RELACIÓN
========================= */
export const createProductCollection = async (payload) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(
    `${API_URL}/api/product_collection/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Error al crear la relación product-collection");
  }

  return response.json();
};

/* =========================
   ELIMINAR RELACIÓN
========================= */
export const removeProductCollection = async (
  productId,
  collectionId
) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(
    `${API_URL}/api/product_collection/product/${productId}/collection/${collectionId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al eliminar la relación product-collection");
  }

  return true;
};
