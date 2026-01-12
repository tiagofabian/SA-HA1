import React, { useState } from "react";
import productsData from "../data/products.json";
import { useCart } from "../context/cartContext";

const Products = () => {
  // Cargar imágenes
  const images = import.meta.glob("@/assets/images/productos/*", {
    eager: true,
  });

  // 🟢 Productos
  const [products] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : productsData;
  });

  // 🛒 Cart
  const { cart, addToCart, decreaseQuantity } = useCart();

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const getImagePath = (imageName) => {
    const foundKey = Object.keys(images).find((key) =>
      key.includes(imageName)
    );
    return foundKey ? images[foundKey].default : imageName;
  };

  return (
    <div className="container-products p-5">
      <h1 className="text-3xl font-bold text-center mb-8">
        Nuestros Productos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentProducts.map((product) => {
          const cartItem = cart.find(
            (item) => item.id === product.id
          );

          return (
            <div
              key={product.id}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <img
                src={getImagePath(product.imagen)}
                alt={product.nombre}
                className="w-full h-64 object-cover rounded-md"
              />

              <div className="flex flex-col flex-grow">
                <h3 className="google-font-text mt-3 font-medium text-lg line-clamp-1">
                  {product.nombre}
                </h3>

                <p className="google-font-text text-gray-500 font-medium">
                  ${product.precio.toLocaleString()}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-400 badge">
                    {product.categoria}
                  </span>

                  {cartItem ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          decreaseQuantity(product.id)
                        }
                        className="border border-black px-2 rounded hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="font-medium">
                        {cartItem.quantity}
                      </span>

                      <button
                        onClick={() =>
                          addToCart({
                            ...product,
                            imageSrc: getImagePath(product.imagen),
                          })
                        }
                        className="border border-black px-2 rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        addToCart({
                          ...product,
                          imageSrc: getImagePath(product.imagen),
                        })
                      }
                      className="bg-black text-white py-1 px-3 rounded text-sm hover:bg-gray-800 transition-colors"
                    >
                      Agregar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Anterior
        </button>

        <span className="font-medium">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Products;
