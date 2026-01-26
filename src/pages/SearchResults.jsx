import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductsByTerm } from "@/services/product.service";
import { useCart } from "@/context/CartContext";

const SearchResults = ({ itemsPerPage = 20 }) => {
  const { term } = useParams();
  const { cart, addToCart, decreaseQuantity } = useCart();

  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔄 Fetch de productos según término de búsqueda
  useEffect(() => {
    const fetchResults = async () => {
      setLoadingData(true);
      try {
        const data = await fetchProductsByTerm(term);
        setProducts(data);
        setCurrentPage(1); // reset de paginado
      } catch (error) {
        console.error("Error cargando productos", error);
        setProducts([]);
      } finally {
        setLoadingData(false);
      }
    };

    fetchResults();
  }, [term]);

  // 📄 Paginación
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (loadingData)
    return (
      <p className="text-center mt-10 min-h-screen">
        Cargando productos...
      </p>
    );

  if (!products.length)
    return (
      <p className="text-center mt-10">No se encontraron productos</p>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 max-w-[1600px] mx-auto gap-28 flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8">
        Resultados para: "{term}"
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {currentProducts.map((product) => {
          const cartItem = cart.find((item) => item.id_product === product.id);
          const mainImage = product.imageUrls?.[0] || "/placeholder.png";

          return (
            <div
              key={product.id}
              className="border rounded-xl shadow p-4 bg-white transition-opacity duration-300 max-w-[300px] w-full mx-auto"
            >
              <Link to={`/producto/${product.id}`}>
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md mb-3"
                />
                <h3 className="font-medium text-lg line-clamp-1">
                  {product.name}
                </h3>
              </Link>

              <p className="text-gray-500 font-medium mb-2">
                ${product.price.toLocaleString()}
              </p>

              <div className="mt-4 flex justify-between items-center">
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
                    onClick={() =>
                      addToCart({ ...product, imageSrc: mainImage })
                    }
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
            onClick={handlePrev}
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
            onClick={handleNext}
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

export default SearchResults;