import React from 'react';

const ProductImages = ({ images, currentImageIndex, onImageChange, onThumbnailClick }) => {
  const handlePrevImage = () => {
    onImageChange(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    onImageChange(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  const currentImage = images && images.length > 0
    ? images[currentImageIndex]
    : "/placeholder.png";

  return (
    <div className="lg:w-1/2">
      <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
        {/* Imagen principal */}
        <div className="relative overflow-hidden rounded-xl h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center">
          <img
            src={currentImage}
            alt={`Imagen ${currentImageIndex + 1}`}
            className="w-full h-auto max-h-[450px] object-contain"
          />
          
          {images && images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 hover:shadow-xl"
                aria-label="Imagen anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 hover:shadow-xl"
                aria-label="Siguiente imagen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </>
          )}
          
          {images && images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-gray-800 scale-125' 
                      : 'bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Miniaturas */}
        {images && images.length > 1 && (
          <div className="mt-6">
            <div className="flex justify-center gap-3 overflow-x-auto py-2 px-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => onThumbnailClick(index)}
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'border-gray-800 scale-105 shadow-lg ring-2 ring-gray-300' 
                      : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImages;