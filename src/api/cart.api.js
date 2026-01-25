import { API_URL } from "../config/env";
import { getAuthToken } from "@/lib/helpers"; // Asumo que tienes esta función

// Obtener carrito del usuario
export const getCart = async () => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No autenticado");
    }

    const response = await fetch(`${API_URL}/api/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener carrito");
    }

    return response.json();
};

// Agregar producto al carrito
export const addToCart = async (productId, quantity = 1) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No autenticado");
    }

    const response = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
        throw new Error("Error al agregar al carrito");
    }

    return response.json();
};

// Actualizar cantidad
export const updateCartItem = async (cartProductId, quantity) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No autenticado");
    }

    const response = await fetch(`${API_URL}/api/cart/update/${cartProductId}?quantity=${quantity}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al actualizar carrito");
    }

    return response.json();
};

// Eliminar producto del carrito
export const removeFromCart = async (cartProductId) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No autenticado");
    }

    const response = await fetch(`${API_URL}/api/cart/remove/${cartProductId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al eliminar del carrito");
    }

    return true;
};

// Vaciar carrito
export const clearCart = async () => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No autenticado");
    }

    const response = await fetch(`${API_URL}/api/cart/clear`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al vaciar carrito");
    }

    return true;
};

// Obtener conteo de items
export const getCartCount = async () => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No autenticado");
    }

    const response = await fetch(`${API_URL}/api/cart/count`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener conteo del carrito");
    }

    return response.json();
};