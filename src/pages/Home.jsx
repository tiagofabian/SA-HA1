import React from 'react'
import HeroSlider from '../components/HeroSlider'
import Testimonials from '../components/Testimonials'
import Benefits from '../components/Benefits'
import { carousel } from "@/lib/carousel";
import Carousel from "@/components/Carousel";
import CollectionsAlternate from "@/components/CollectionsAlternate";
import FeaturedCollection from "@/components/FeaturedCollection"; // Importar nuevo componente

const Home = () => {
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