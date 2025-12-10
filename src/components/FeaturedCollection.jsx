import { Button } from "@/components/ui/button";
import { useState } from "react";

const FeaturedCollection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const remainingUnits = 42; // Puedes hacer esto dinámico

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-br from-[#304131] to-[#4f7e6b] rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Imagen (60% ancho en desktop) */}
            <div className="lg:w-3/5 relative overflow-hidden">
              <img
                src="/carousel/sakura-collection.png"
                alt="Sakura Collection"
                className="w-full h-full min-h-[500px] object-cover transform transition-transform duration-700 hover:scale-105"
              />
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent lg:from-black/5" />

              {/* Badge en imagen */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <span className="font-bold text-[#304131] text-sm">
                  COLECCIÓN EXCLUSIVA
                </span>
              </div>
            </div>

            {/* Texto y CTA (40% ancho en desktop) */}
            <div className="lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="space-y-8">
                {/* Título */}
                <div>
                  <span className="inline-block text-white/80 text-sm font-semibold tracking-wider uppercase mb-3">
                    Edición Limitada
                  </span>
                  <h2 className="google-font-title text-4xl md:text-5xl lg:text-7xl font-[700] text-white leading-tight">
                    Sakura Collection
                  </h2>
                  <h5 className="text-white/90 text-xl md:text-xl lg:text-[1.6rem] font-bold">
                    Belleza Efímera
                  </h5>
                </div>

                {/* Descripción */}
                <div className="space-y-4">
                  <p className="text-white/90 text-lg leading-relaxed">
                    Inspirada en la fugaz belleza de los cerezos en flor. Cada
                    pieza captura la delicadeza y profundidad de la cultura
                    japonesa.
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Fabricadas con materiales que honran la tradición artesanal
                    y detalles únicos que evocan la serenidad de los jardines
                    japoneses.
                  </p>
                </div>

                {/* Información de unidades */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">
                      Unidades disponibles
                    </span>
                    <span className="text-white font-bold">
                      {remainingUnits}/100
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${remainingUnits}%` }}
                    />
                  </div>
                </div>

                {/* Botones CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="bg-white text-[#304131] hover:bg-white/90 font-semibold py-6 text-lg flex-1 group relative overflow-hidden"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Ver Colección
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>

                    {/* Tooltip de unidades al hover */}
                    {isHovered && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-[#304131] px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap animate-fade-in-up">
                        Solo {remainingUnits} unidades restantes
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                      </div>
                    )}
                  </Button>
                </div>

                {/* Features adicionales */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="text-center">
                    <div className="text-white text-2xl font-bold">24K</div>
                    <div className="text-white/70 text-sm">Oro Auténtico</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white text-2xl font-bold">100%</div>
                    <div className="text-white/70 text-sm">Hecho a Mano</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white text-2xl font-bold">★ 4.9</div>
                    <div className="text-white/70 text-sm">Valoración</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white text-2xl font-bold">3 Días</div>
                    <div className="text-white/70 text-sm">Envío Gratis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
