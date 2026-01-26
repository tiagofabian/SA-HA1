import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = ({ products, title = "Colecciones Destacadas", subtitle = "Descubre nuestras piezas más exclusivas" }) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const productsPerSlide = 4;
  const maxProducts = 4;

  // 👇 limitar productos
  const limitedProducts = products.slice(0, maxProducts);

  // Crear slides dinámicamente
  const slides = [];
  for (let i = 0; i < limitedProducts.length; i += productsPerSlide) {
    slides.push(limitedProducts.slice(i, i + productsPerSlide));
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Función para manejar el click en el producto
  const handleProductClick = (e, product) => {
    // Usa el ID del producto para navegar a la página de descripción
    e.preventDefault();
    e.stopPropagation();
    console.log("Producto clickeado:", product);
    navigate(`/producto/${product.id}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-20"> 

      {/* Slider container */}
      <div className="relative overflow-hidden">
        <h2 className="google-font-title mb-8 text-3xl text-center font-bold text-foreground md:text-4xl lg:text-[3rem]">
          Productos Destacados
        </h2>
        {/* Slides */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {/* CAMBIAR: grid-cols-4 en lugar de grid-cols-3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {slide.map((product) => (
                  <div key={product.id} onClick={(e) => handleProductClick(e, product)} className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition-shadow cursor-pointer group">
                    <img
                      src={product.image || 'https://www.reisender.com.ar/images/product-placeholder.png'}
                      alt={product.title}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 
                        'https://www.reisender.com.ar/images/product-placeholder.png';}}
                      className="w-full h-64 object-cover rounded-md"
                    />
                    <h3 className="google-font-text mt-3 !font-[500] text-lg line-clamp-1">{product.title}</h3>
                    <p className="google-font-text text-gray-500 font-medium">{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/70 hover:bg-black text-white px-4 py-3 rounded-full shadow-lg transition-colors"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/70 hover:bg-black text-white px-4 py-3 rounded-full shadow-lg transition-colors"
        >
          →
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === i 
                ? "bg-black scale-125" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;