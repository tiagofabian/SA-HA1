import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { fetchProductById } from "@/services/product.service"; // ← CAMBIADO

// Importar componentes
import ProductImages from "@/components/pdp/ProductImages";
import ProductHeader from "@/components/pdp/ProductHeader";
import ProductDescription from "@/components/pdp/ProductDescription";
import ProductMetadata from "@/components/pdp/ProductMetadata";
import ProductActions from "@/components/pdp/ProductActions";

const ProductDescriptionPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { cart, addToCart, decreaseQuantity } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // USAR fetchProductById EN LUGAR DE fetchAllProducts
        const productData = await fetchProductById(id); // ← CAMBIADO
        if (!productData) throw new Error("Producto no encontrado");
        setProduct(productData);
        setCurrentImageIndex(0);
      } catch (err) {
        setError(err.message || "Error al cargar producto");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadProduct();
  }, [id]);

  const handleAddToCart = (productToAdd) => {
    addToCart({ ...productToAdd, imageUrls: productToAdd.imageUrls });
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Loading, error y estados vacíos
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!product) return <EmptyState />;

  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="max-w-7xl mx-auto my-8 md:my-20 lg:my-24 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Componente de imágenes */}
        <ProductImages
          images={product.imageUrls}
          currentImageIndex={currentImageIndex}
          onImageChange={setCurrentImageIndex}
          onThumbnailClick={handleThumbnailClick}
        />

        {/* Detalles del producto */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 h-full flex flex-col">
            {/* Header del producto */}
            <ProductHeader
              name={product.name}
              price={product.price}
              stock={product.stock}
            />

            {/* Contenido principal */}
            <div className="space-y-4 flex-grow">
              {/* Descripción */}
              <ProductDescription description={product.description} />

              {/* Metadatos */}
              <ProductMetadata
                category={product.category}
                collections={product.collections}
                stock={product.stock}
              />
            </div>

            {/* Acciones */}
            <ProductActions
              product={product}
              quantityInCart={quantityInCart}
              onAddToCart={handleAddToCart}
              onDecreaseQuantity={decreaseQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componentes para estados (sin cambios)
const LoadingState = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="max-w-6xl mx-auto my-20 px-6">
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="max-w-6xl mx-auto my-20 px-6 text-center">
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">Producto no encontrado</h3>
    <p className="mt-1 text-sm text-gray-500">El producto que buscas no está disponible.</p>
  </div>
);

export default ProductDescriptionPage;