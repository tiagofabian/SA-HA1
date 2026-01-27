import React, { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider";
import Testimonials from "../components/Testimonials";
import Benefits from "../components/Benefits";
import Carousel from "@/components/Carousel";
import CollectionsAlternate from "@/components/CollectionsAlternate";
import FeaturedCollection from "@/components/FeaturedCollection";
import { fetchProductsByCollectionSlug } from "@/services/product.service";

// 🔧 Optimización Uploadcare
const optimizeImage = (url) =>
  `${url}-/resize/600x/-/format/auto/-/quality/smart/`;

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollectionProducts = async () => {
      try {
        setLoading(true);
        const collection = await fetchProductsByCollectionSlug(
          "productos_destacados"
        );

        const products = collection
          .filter((product) => product.imageUrls?.[0])
          .slice(0, 12)
          .map((product) => ({
            id: product.id,
            title: product.name || "Producto sin nombre",
            price: `$${product.price?.toLocaleString() || "0"}`,
            image: optimizeImage(product.imageUrls[0]),
          }));

        setFilteredProducts(products);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadCollectionProducts();
  }, []);

  // 🚀 Preload de la primera imagen del carrusel
  useEffect(() => {
    if (filteredProducts[0]?.image) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = filteredProducts[0].image;
      document.head.appendChild(link);
    }
  }, [filteredProducts]);

  return (
    <div className="min-h-screen">
      <HeroSlider />

      <section className="pt-4 pb-2 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* ✅ El carrusel SIEMPRE se renderiza */}
          <Carousel products={filteredProducts} loading={loading} />
        </div>
      </section>

      <FeaturedCollection />

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CollectionsAlternate />
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Testimonials />
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Benefits />
        </div>
      </section>
    </div>
  );
};

export default Home;
