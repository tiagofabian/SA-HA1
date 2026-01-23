import React, { useState, useEffect } from 'react'
import HeroSlider from '../components/HeroSlider'
import Testimonials from '../components/Testimonials'
// import ThematicCollections from '@/components/ThematicCollections';
import Benefits from '../components/Benefits'
import Carousel from "@/components/Carousel";
import CollectionsAlternate from "@/components/CollectionsAlternate";
import FeaturedCollection from "@/components/FeaturedCollection"; // Importar nuevo componente
import { fetchAllProducts } from '@/services/product.service';

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadCollectionProducts = async () => {
      try {
        // 1. Obtener todos los productos
        const allProducts = await fetchAllProducts();
        console.log('Todos los productos:', allProducts);
        
        // 2. Mapear al formato que espera el Carousel
        const products = allProducts
          .map(product => ({
            id: product.id,
            title: product.nombre || product.title,
            price: `$${product.precio || product.price}`,
            image: product.imageUrls?.[0]
          }));
        
        console.log('Productos para mostrar:', products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setFilteredProducts([]);
      }
    };

    loadCollectionProducts();
  }, []);
  return (
    <div className='container-home'>
      <HeroSlider/>
      <Carousel products={filteredProducts}/>
      <FeaturedCollection/> {/* Nueva sección destacada */}
      <CollectionsAlternate/>
      <Testimonials/>
      <Benefits/>
    </div>
  )
}

export default Home