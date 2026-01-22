import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { fetchAllProducts } from "@/services/product.service";
import { fetchAllCategorys } from "@/services/category.service"; // 👈 NUEVO


const ProductDescription = () => {
  const { id } = useParams(); // Obtenemos el id desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); // 👈 NUEVO

  const { cart, addToCart, decreaseQuantity } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // const products = await fetchAllProducts(); // 👈 NUEVO
        const [products, categoriesData] = await Promise.all([ // 👈 NUEVO
          fetchAllProducts(),
          fetchAllCategorys(),
        ]);
        const prod = products.find(
          (p) => p.id_product.toString() === id
        );
        if (!prod) throw new Error("Producto no encontrado");
        setProduct(prod);
        setCategories(categoriesData); // 👈 NUEVO
      } catch (err) {
        setError(err.message || "Error al cargar producto");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando producto...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return <p className="text-center mt-10">Producto no encontrado</p>;

  const cartItem = cart.find((item) => item.id === product.id_product);

  return (
    <div className="max-w-6xl mx-auto my-20 px-6 flex flex-col md:flex-row gap-10">
      {/* Imagen */}
      <div className="flex-shrink-0 md:w-1/2">
        <img
          src={product.imageUrl}
          alt={product.product_name}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Detalles */}
      <div className="flex flex-col flex-grow gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">{product.product_name}</h1>

        {/* 👈 NUEVO */}
        <p className="text-gray-500 text-sm md:text-base">
          Categoría:{" "}
          {categories.find(cat => cat.id_category === product.id_category)
            ?.category_name ?? "Sin categoría"}
        </p>

        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <p className="text-2xl font-semibold mt-4">${product.price.toLocaleString()}</p>

        <p className="text-gray-400 text-sm">Stock disponible: {product.stock}</p>

        {/* Botón agregar al carrito */}
        <div className="mt-auto">
          {cartItem ? (
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={() => decreaseQuantity(product.id_product)}
                className="border px-3 py-2 rounded hover:bg-gray-100 w-1/3"
              >
                −
              </button>

              <span className="font-medium text-center w-1/3">{cartItem.quantity}</span>

              <button
                onClick={() =>
                  addToCart({ ...product, imageSrc: product.imageUrl })
                }
                className="border px-3 py-2 rounded hover:bg-gray-100 w-1/3"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart({ ...product, imageSrc: product.imageUrl })}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors w-full"
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;




