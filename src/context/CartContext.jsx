import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ Agregar / sumar
  const addToCart = (product) => {
    const normalizedProduct = {
      id_product: product.id_product,
      nombre: product.product_name ?? product.nombre,
      precio: product.price ?? product.precio,
      imageSrc: product.imageUrl ?? product.imageSrc,
    };

    setCart((prev) => {
      const exists = prev.find(
        (item) => item.id_product === normalizedProduct.id_product
      );

      if (exists) {
        return prev.map((item) =>
          item.id_product === normalizedProduct.id_product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...normalizedProduct, quantity: 1 }];
    });
  };

  // ➖ Restar
  const decreaseQuantity = (id_product) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id_product === id_product
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 🗑 Eliminar
  const removeFromCart = (id_product) => {
    setCart((prev) =>
      prev.filter((item) => item.id_product !== id_product)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
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
