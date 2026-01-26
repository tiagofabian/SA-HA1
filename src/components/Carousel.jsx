import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PLACEHOLDER_PRODUCT = {
  id: "placeholder",
  title: "Próximamente",
  price: "",
  image: "https://www.reisender.com.ar/images/product-placeholder.png",
  isPlaceholder: true,
};

const Carousel = ({
  products,
  title = "Productos Destacados",
  subtitle = "Descubre nuestras piezas más exclusivas",
}) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const productsPerSlide = 4;
  const maxProducts = 12;

  // 1️⃣ Limitar productos reales
  const limitedProducts = products.slice(0, maxProducts);

  // 2️⃣ Rellenar con placeholders si faltan
  const filledProducts = [
    ...limitedProducts,
    ...Array.from(
      { length: maxProducts - limitedProducts.length },
      (_, i) => ({
        ...PLACEHOLDER_PRODUCT,
        id: `placeholder-${i}`,
      })
    ),
  ];

  // 3️⃣ Crear slides
  const slides = [];
  for (let i = 0; i < filledProducts.length; i += productsPerSlide) {
    slides.push(filledProducts.slice(i, i + productsPerSlide));
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleProductClick = (e, product) => {
    if (product.isPlaceholder) return;
    e.preventDefault();
    e.stopPropagation();
    navigate(`/producto/${product.id}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-20">
      <div className="relative overflow-hidden">
        <h2 className="google-font-title mb-2 text-3xl text-center font-bold md:text-4xl">
          {title}
        </h2>
        <p className="google-font-text mb-8 text-center text-gray-500">
          {subtitle}
        </p>

        {/* Slides */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {slide.map((product) => (
                  <div
                    key={product.id}
                    onClick={(e) => handleProductClick(e, product)}
                    className={`border rounded-xl shadow p-4 bg-white transition-shadow group
                      ${
                        product.isPlaceholder
                          ? "cursor-default opacity-70"
                          : "cursor-pointer hover:shadow-lg"
                      }`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-64 object-cover rounded-md"
                    />
                    <h3 className="google-font-text mt-3 text-lg font-medium text-center">
                      {product.title}
                    </h3>
                    {!product.isPlaceholder && (
                      <p className="google-font-text text-gray-500 font-medium text-center">
                        {product.price}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/70 hover:bg-black text-white px-4 py-3 rounded-full"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/70 hover:bg-black text-white px-4 py-3 rounded-full"
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
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
