import {
    getCart,
    addToCart as addToCartApi,
    updateCartItem,
    removeFromCart as removeFromCartApi,
    clearCart as clearCartApi,
    getCartCount,
} from "@/api/cart.api";

/**
 * Obtener carrito del backend
 */
export const fetchCart = async () => {
    try {
        const cartItems = await getCart();
        // Transformar la respuesta del backend al formato que espera el frontend
        return cartItems.map(item => ({
            id: item.productId, // IMPORTANTE: Para el frontend, id es productId
            cartProductId: item.id, // Guardamos el ID real del item del carrito
            name: item.productName,
            price: item.productPrice,
            imageSrc: item.productImage,
            quantity: item.quantity,
        }));
    } catch (error) {
        console.error("Error al obtener carrito:", error);
        throw error;
    }
};

/**
 * Agregar producto al carrito (backend)
 */
export const addToCart = async (productId, quantity = 1) => {
    try {
        const response = await addToCartApi(productId, quantity);
        // La respuesta del backend tiene el formato del item completo
        return {
            id: response.productId,
            cartProductId: response.id,
            name: response.productName,
            price: response.productPrice,
            imageSrc: response.productImage,
            quantity: response.quantity,
        };
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        throw error;
    }
};

/**
 * Actualizar cantidad en el carrito (backend)
 */
export const updateQuantity = async (cartProductId, quantity) => {
    try {
        const response = await updateCartItem(cartProductId, quantity);
        return {
            id: response.productId,
            cartProductId: response.id,
            name: response.productName,
            price: response.productPrice,
            imageSrc: response.productImage,
            quantity: response.quantity,
        };
    } catch (error) {
        console.error("Error al actualizar cantidad:", error);
        throw error;
    }
};

/**
 * Eliminar producto del carrito (backend)
 */
export const removeFromCart = async (cartProductId) => {
    try {
        await removeFromCartApi(cartProductId);
        return true;
    } catch (error) {
        console.error("Error al eliminar del carrito:", error);
        throw error;
    }
};

/**
 * Vaciar carrito (backend)
 */
export const clearCart = async () => {
    try {
        await clearCartApi();
        return true;
    } catch (error) {
        console.error("Error al vaciar carrito:", error);
        throw error;
    }
};

/**
 * Obtener conteo de items (backend)
 */
export const fetchCartCount = async () => {
    try {
        return await getCartCount();
    } catch (error) {
        console.error("Error al obtener conteo del carrito:", error);
        throw error;
    }
};