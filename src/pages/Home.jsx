import React from 'react'
import HeroSlider from '../components/HeroSlider'
import Testimonials from '../components/Testimonials'
// import ThematicCollections from '@/components/ThematicCollections';
import Benefits from '../components/Benefits'
import Carousel from "@/components/Carousel";
import { carousel } from "@/lib/carousel";
import CollectionsAlternate from "@/components/CollectionsAlternate";
import FeaturedCollection from "@/components/FeaturedCollection"; // Importar nuevo componente

const Home = () => {
  console.log()
  return (
    <div className='container-home'>
      <HeroSlider/>
      <Carousel products={carousel}/>
      <FeaturedCollection/> {/* Nueva sección destacada */}
      <CollectionsAlternate/>
      <Testimonials/>
      <Benefits/>
    </div>
  )
}

export default Home