import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // 🔹 importar Link
import { useCart } from "../context/CartContext";
import { fetchAllProducts } from "@/services/product.service";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cart, addToCart, decreaseQuantity } = useCart();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container-products p-5">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentProducts.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id_product);

          return (
            <div
              key={product.id_product}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition-shadow"
            >
              {/* 🔹 Link alrededor de la imagen y nombre */}
              <Link to={`/productos/${product.id_product}`}>
                <img
                  src={product.imageUrl}
                  alt={product.product_name}
                  className="w-full h-64 object-cover rounded-md mb-3"
                />
                <h3 className="google-font-text font-medium text-lg line-clamp-1">
                  {product.product_name}
                </h3>
              </Link>

              <p className="google-font-text text-gray-500 font-medium mb-2">
                ${product.price.toLocaleString()}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-400 badge">
                  {product.category_name ?? "sin categoría"}
                </span>

                {cartItem ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(product.id_product)}
                      className="border border-black px-2 rounded hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="font-medium">{cartItem.quantity}</span>

                    <button
                      onClick={() =>
                        addToCart({ ...product, imageSrc: product.imageUrl })
                      }
                      className="border border-black px-2 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart({ ...product, imageSrc: product.imageUrl })}
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
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
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
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Products;
