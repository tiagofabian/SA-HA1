import { API_URL } from "../config/env";
import { getAuthToken } from "@/lib/helpers";

/* =========================
   LISTAR TODOS
========================= */
export const getAllOrderProducts = async () => {
  const response = await fetch(
    `${API_URL}/api/order_product`
  );

  if (!response.ok) {
    throw new Error("Error al listar order-product");
  }

  return response.json();
};

/* =========================
   OBTENER POR IDS
========================= */
export const getOrderProductByIds = async (
  orderId,
  productId
) => {
  const response = await fetch(
    `${API_URL}/api/order_product/order/${orderId}/product/${productId}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener order-product");
  }

  return response.json();
};

/* =========================
   CREAR
========================= */
export const createOrderProduct = async (payload) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(
    `${API_URL}/api/order_product/create`,
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
    throw new Error("Error al crear order-product");
  }

  return response.json();
};

/* =========================
   ACTUALIZAR
========================= */
export const updateOrderProduct = async (
  orderId,
  productId,
  payload
) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(
    `${API_URL}/api/order_product/order/${orderId}/product/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Error al actualizar order-product");
  }

  return response.json();
};

/* =========================
   ELIMINAR
========================= */
export const removeOrderProduct = async (
  orderId,
  productId
) => {
  const token = getAuthToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch(
    `${API_URL}/api/order_product/order/${orderId}/product/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al eliminar order-product");
  }

  return true;
};
