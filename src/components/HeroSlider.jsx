import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import heroSlider1 from "./../assets/hero-slider-1.jpg";
import heroSlider2 from "./../assets/hero-slider-2.jpg";
import heroSlider3 from "./../assets/hero-slider-3.jpg";

const slides = [
  {
    image: heroSlider1,
    title: "Joyas Inspiradas en Anime",
    subtitle: "Descubre nuestra colección exclusiva de piezas únicas",
  },
  {
    image: heroSlider2,
    title: "Elegancia Otaku",
    subtitle: "Artesanía de alta calidad con diseños legendarios",
  },
  {
    image: heroSlider3,
    title: "Gaming en Oro y Plata",
    subtitle: "Celebra tu pasión por los videojuegos con estilo",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-muted">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-2xl animate-fade-in-up">
                <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>
                <p className="mb-8 text-lg text-white/90 md:text-xl">
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-all hover:scale-105"
                >
                  Explorar Colección
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/40 md:left-8"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/40 md:right-8"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider