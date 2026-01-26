import React, { useState, useEffect } from 'react'
import HeroSlider from '../components/HeroSlider'
import Testimonials from '../components/Testimonials'
import Benefits from '../components/Benefits'
import Carousel from "@/components/Carousel";
import CollectionsAlternate from "@/components/CollectionsAlternate";
import FeaturedCollection from "@/components/FeaturedCollection";
import { fetchProductsByCollectionSlug } from '@/services/product.service';

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollectionProducts = async () => {
      try {
        setLoading(true);
        const collectionSlug = ["Productos_Destacados"]
        const collection = await fetchProductsByCollectionSlug("productos_destacados");

        console.log("aquiiii", collection);
        
        const products = collection
          .filter(product => product.imageUrls?.[0]) // Solo productos con imagen
          .slice(0, 12) // Limitar a 12 productos para mobile
          .map(product => ({
            id: product.id,
            title: product.name || "Producto sin nombre",
            price: `$${product.price?.toLocaleString() || "0"}`,
            image: product.imageUrls?.[0]
          }));
        
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadCollectionProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSlider />
      
      {/* Carousel section with responsive padding */}
      <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : (
            <Carousel products={filteredProducts} />
          )}
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
}

export default Home;