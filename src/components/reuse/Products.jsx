import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Products = ({
  products: initialProducts = [], // Lista de productos que recibe
  categoryId = null,              // Id de categoría (opcional)
  collectionId = null,            // Id de colección (opcional)
  title = "Nuestros Productos",   // Título opcional
  itemsPerPage = 8,               // Paginación configurable
}) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { cart, addToCart, decreaseQuantity } = useCart();

  // Filtrar productos según categoryId o collectionId
  useEffect(() => {
    let filtered = initialProducts;

    if (categoryId) {
      filtered = filtered.filter(
        (p) => p.category?.id === categoryId
      );
    }

    if (collectionId) {
      filtered = filtered.filter(
        (p) => p.collections?.some((c) => c.id === collectionId)
      );
    }

    setProducts(filtered);
    setCurrentPage(1); // Resetear paginación al cambiar la lista
  }, [initialProducts, categoryId, collectionId]);

  // Paginación
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (!products.length)
    return <p className="text-center mt-10">No hay productos disponibles</p>;

  return (
    <div className="container-products p-5">
      <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentProducts.map((product) => {
          const cartItem = cart.find((item) => item.id_product === product.id);

          const mainImage =
            product.imageUrls && product.imageUrls.length > 0
              ? product.imageUrls[0]
              : "/placeholder.png";

          return (
            <div
              key={product.id}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <Link to={`/producto/${product.id}`}>
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md mb-3"
                />
                <h3 className="google-font-text font-medium text-lg line-clamp-1">
                  {product.name}
                </h3>
              </Link>

              <p className="google-font-text text-gray-500 font-medium mb-2">
                ${product.price.toLocaleString()}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-400 badge">
                  {product.category?.name ?? "sin categoría"}
                </span>

                {cartItem ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="border border-black px-2 rounded hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="font-medium">{cartItem.quantity}</span>

                    <button
                      onClick={() =>
                        addToCart({ ...product, imageSrc: mainImage })
                      }
                      className="border border-black px-2 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart({ ...product, imageSrc: mainImage })}
                    className="bg-black text-white py-1 px-3 rounded text-sm hover:bg-gray-800 transition-colors"
                  >
                    Agregar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
      )}
    </div>
  );
};

export default Products;
