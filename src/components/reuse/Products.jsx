import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

// services
import {
  fetchProductsByCategorySlug,
  fetchProductsByCollectionSlug,
} from "@/services/product.service";

const Products = ({
  title = "Nuestros Productos",
  itemsPerPage = 8,
}) => {
  const { slug } = useParams();
  const location = useLocation();

  const isCategory = location.pathname.includes("/category/");
  const isCollection = location.pathname.includes("/collection/");

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loadingData, setLoadingData] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);

  const [dynamicTitle, setDynamicTitle] = useState("");

  const { cart, addToCart, decreaseQuantity } = useCart();

  // 🔄 Fetch dinámico por slug
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingData(true);
        setImagesReady(false);
        setLoadedImages(0);

        let data = [];

        if (isCategory) {
          data = await fetchProductsByCategorySlug(slug);
        } else if (isCollection) {
          data = await fetchProductsByCollectionSlug(slug);
        }

        setProducts(data);
        setCurrentPage(1);

        // 🏷️ Título dinámico
        if (data.length > 0) {
          if (isCategory) {
            setDynamicTitle(`Categoría ${data[0].category?.name ?? ""}`);
          }

          if (isCollection) {
            setDynamicTitle(
              `Colección ${data[0].collections?.[0]?.name ?? ""}`
            );
          }
        } else {
          setDynamicTitle(title);
        }
      } catch (error) {
        console.error("Error cargando productos", error);
        setProducts([]);
        setDynamicTitle(title);
      } finally {
        setLoadingData(false);
      }
    };

    fetchProducts();
  }, [slug, isCategory, isCollection, title]);

  // 🖼️ Control de carga de imágenes
  useEffect(() => {
    if (products.length === 0) return;

    if (loadedImages >= products.length) {
      setImagesReady(true);
    }
  }, [loadedImages, products.length]);

  // 📄 Paginación
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // 🌀 Estados visuales
  if (loadingData) {
    return (
      <p className="text-center mt-10 text-gray-500 min-h-screen">
        Cargando productos...
      </p>
    );
  }

  if (!products.length) {
    return (
      <p className="text-center mt-10 text-gray-500 min-h-screen">
        No hay productos disponibles
      </p>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 max-w-[1600px] mx-auto gap-28 flex flex-col">
      <h1 className="text-3xl font-bold text-center">
        {dynamicTitle || title}
      </h1>

      {!imagesReady && (
        <p className="text-center text-gray-400 mb-6">
          Cargando imágenes…
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {currentProducts.map((product) => {
          const cartItem = cart.find(
            (item) => item.id_product === product.id
          );

          const mainImage =
            product.imageUrls?.length > 0
              ? product.imageUrls[0]
              : "/placeholder.png";

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
                  onLoad={() => setLoadedImages((prev) => prev + 1)}
                  onError={() => setLoadedImages((prev) => prev + 1)}
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
      )}
    </div>
  );
};

export default Products;
