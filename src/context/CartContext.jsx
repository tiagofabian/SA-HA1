import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as cartService from "@/services/cart.service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsingBackend, setIsUsingBackend] = useState(false);

  // Cargar carrito inicial
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (isAuthenticated && user) {
          // Usuario logueado: cargar del backend
          const backendCart = await cartService.fetchCart();
          setCart(backendCart);
          setIsUsingBackend(true);
        } else {
          // Usuario no logueado: cargar de localStorage
          const storedCart = localStorage.getItem("cart");
          const localCart = storedCart ? JSON.parse(storedCart) : [];
          setCart(localCart);
          setIsUsingBackend(false);
        }
      } catch (error) {
        console.error("Error al cargar carrito:", error);
        // Fallback a localStorage si hay error con backend
        const storedCart = localStorage.getItem("cart");
        setCart(storedCart ? JSON.parse(storedCart) : []);
        setIsUsingBackend(false);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      loadCart();
    }
  }, [isAuthenticated, user, authLoading]);

  // Sincronizar al cambiar autenticación (login/logout)
  useEffect(() => {
    const syncCartOnAuthChange = async () => {
      if (authLoading) return;

      if (isAuthenticated && user) {
        // Al loguearse: mergear localStorage con backend
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (localCart.length > 0) {
          try {
            console.log("Sincronizando carrito localStorage → backend");

            // Para cada item en localStorage, agregar al backend
            for (const item of localCart) {
              try {
                await cartService.addToCart(item.id, item.quantity);
              } catch (error) {
                console.warn(`Error sincronizando producto ${item.id}:`, error);
              }
            }

            // Limpiar localStorage después de sincronizar
            localStorage.removeItem("cart");
            console.log("Carrito sincronizado y localStorage limpiado");

            // Recargar carrito del backend
            const backendCart = await cartService.fetchCart();
            setCart(backendCart);
            setIsUsingBackend(true);

          } catch (error) {
            console.error("Error en sincronización:", error);
          }
        }
      } else if (!isAuthenticated && isUsingBackend) {
        // Al desloguearse: cambiar a localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        setIsUsingBackend(false);
        console.log("Cambiando a localStorage (usuario deslogueado)");
      }
    };

    syncCartOnAuthChange();
  }, [isAuthenticated, user, authLoading]);

  // Guardar cambios en el carrito
  useEffect(() => {
    if (!loading) {
      if (isUsingBackend) {
        // El backend ya guardó los cambios, no necesitamos hacer nada extra
      } else {
        // Guardar en localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }, [cart, isUsingBackend, loading]);

  // Agregar producto al carrito
  const addToCart = async (product) => {
    // Normalizar producto
    const normalizedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: product.imageUrls && product.imageUrls.length > 0
        ? product.imageUrls[0]
        : "/placeholder.png",
    };

    if (isUsingBackend && isAuthenticated) {
      try {
        // Verificar si ya está en el carrito
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem && existingItem.cartProductId) {
          // Si ya existe, usar updateQuantity para incrementar
          const newQuantity = existingItem.quantity + 1;
          await cartService.updateQuantity(existingItem.cartProductId, newQuantity);

          setCart(prev =>
            prev.map(item =>
              item.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            )
          );
        } else {
          // Si no existe, agregar nuevo
          const response = await cartService.addToCart(product.id, 1);
          setCart(prev => [
            ...prev,
            {
              ...normalizedProduct,
              quantity: 1,
              cartProductId: response.cartProductId
            }
          ]);
        }
      } catch (error) {
        console.error("Error al agregar al carrito (backend):", error);
        fallbackToLocalStorage();
        addToCartLocal(normalizedProduct);
      }
    } else {
      // Usar localStorage
      addToCartLocal(normalizedProduct);
    }
  };

  // Función auxiliar para agregar a localStorage
  const addToCartLocal = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Disminuir cantidad
  const decreaseQuantity = async (productId) => {
    if (isUsingBackend && isAuthenticated) {
      const item = cart.find(item => item.id === productId);
      if (!item) return;

      try {
        const newQuantity = item.quantity - 1;

        if (newQuantity > 0) {
          await cartService.updateQuantity(item.cartProductId, newQuantity);
          setCart(prev =>
            prev.map(i =>
              i.id === productId ? { ...i, quantity: newQuantity } : i
            )
          );
        } else {
          await cartService.removeFromCart(item.cartProductId);
          setCart(prev => prev.filter(i => i.id !== productId));
        }
      } catch (error) {
        console.error("Error al disminuir cantidad (backend):", error);
      }
    } else {
      decreaseQuantityLocal(productId);
    }
  };


  const decreaseQuantityLocal = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Eliminar producto
  const removeFromCart = async (productId) => {
    if (isUsingBackend && isAuthenticated) {
      const item = cart.find(item => item.id === productId);
      if (!item) return;

      try {
        await cartService.removeFromCart(item.cartProductId);
        setCart(prev => prev.filter(i => i.id !== productId));
      } catch (error) {
        console.error("Error al eliminar del carrito (backend):", error);
      }
    } else {
      removeFromCartLocal(productId);
    }
  };


  const removeFromCartLocal = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Vaciar carrito
  const clearCart = async () => {
    if (isUsingBackend && isAuthenticated) {
      try {
        await cartService.clearCart();
        setCart([]);
      } catch (error) {
        console.error("Error al vaciar carrito (backend):", error);
        fallbackToLocalStorage();
        clearCartLocal();
      }
    } else {
      clearCartLocal();
    }
  };

  const clearCartLocal = () => setCart([]);

  // Fallback a localStorage si hay error con backend
  const fallbackToLocalStorage = () => {
    console.warn("Fallback a localStorage por error con backend");
    setIsUsingBackend(false);
    // Guardar carrito actual en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        isUsingBackend,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);