import { useState } from "react";

const Carousel = ({ products }) => {
  const [current, setCurrent] = useState(0);

  const slides = [
    products.slice(0, 6),
    products.slice(6, 12),
  ];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Slider container */}
      <div className="relative overflow-hidden">

        {/* Slides */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {slide.map((product) => (
                <div key={product.id} className="border rounded-xl shadow p-4 bg-white">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-80 object-cover rounded-md"
                  />
                  <h3 className="mt-3 font-semibold text-lg">{product.title}</h3>
                  <p className="text-gray-500">{product.price}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/60 text-white px-3 py-2 rounded-full"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/60 text-white px-3 py-2 rounded-full"
        >
          →
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              current === i ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;