import React from 'react'
import HeroSlider from '../components/HeroSlider'
import Testimonials from '../components/Testimonials'
import Benefits from '../components/Benefits'
import { carousel } from "@/lib/carousel";
import Carousel from "@/components/Carousel";

const Home = () => {
  return (
    <div className='container-home'>
      <HeroSlider/>
      <Carousel products={carousel}/>
      <Testimonials/>
      <Benefits/>
    </div>
  )
}

export default Home
