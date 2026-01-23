import React, { useState, useEffect } from 'react'
import HeroSlider from '../components/HeroSlider'
import Testimonials from '../components/Testimonials'
// import ThematicCollections from '@/components/ThematicCollections';
import Benefits from '../components/Benefits'
import Carousel from "@/components/Carousel";
import CollectionsAlternate from "@/components/CollectionsAlternate";
import FeaturedCollection from "@/components/FeaturedCollection"; // Importar nuevo componente
import { fetchAllProductCollections } from '@/services/collection-product.service';
import { fetchProductById } from '@/services/product.service';

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadCollectionProducts = async () => {
      try {
        // 1. Obtener todas las relaciones product-collection
        const productCollections = await fetchAllProductCollections();
        console.log('Todas las relaciones:', productCollections);
        
        // 2. Filtrar por collectionId = 3
        const collectionProductIds = productCollections
          .filter(pc => pc.collectionId === 3)
          .map(pc => pc.productId);
        console.log('Product IDs para colección 3:', collectionProductIds);
        
        // 3. Obtener los datos completos de cada producto
        const products = await Promise.all(
          collectionProductIds.map(async (productId) => {
            const product = await fetchProductById(productId);
            console.log('Producto completo:', product); // LOG para ver estructura
            return {
              id: product.id,
              title: product.nombre || product.title,
              price: `$${product.precio || product.price}`,
              image: product.imageUrls?.[0]
            };
          })
        );
        
        console.log('Productos obtenidos:', products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error al cargar los productos de la colección:', error);
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