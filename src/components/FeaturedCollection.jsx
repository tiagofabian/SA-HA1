import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import sakuraCollectionIMG from "@/assets/images/sakura-collection-2.jpeg";
import { fetchCollectionsWithProductsBySlug } from "@/services/collection.service";
import { Link } from "react-router-dom";

const FeaturedCollection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [remainingUnits, setRemainingUnits] = useState(42); // fallback visual

  useEffect(() => {
    const loadSakuraCollection = async () => {
      try {
        const allowedSlugs = ["sakura"];
        const data = await fetchCollectionsWithProductsBySlug(allowedSlugs);

        // defensivo
        const productsCount =
          data?.[0]?.products?.length ?? 0;

        setRemainingUnits(productsCount);
      } catch (err) {
        console.error("Error cargando colección Sakura", err);
      }
    };

    loadSakuraCollection();
  }, []);


  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-br from-[#304131] to-[#4f7e6b] rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Imagen (ESTÁTICA) */}
            <div className="lg:w-3/5 relative overflow-hidden">
              <img
                src={sakuraCollectionIMG}
                alt="Sakura Collection"
                className="w-full h-full min-h-[500px] object-cover transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent lg:from-black/5" />

              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <span className="google-font-text font-bold text-[#304131] text-sm">
                  COLECCIÓN EXCLUSIVA
                </span>
              </div>
            </div>

            {/* Texto (ESTÁTICO) */}
            <div className="lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <span className="google-font-text inline-block text-white/80 text-sm font-semibold tracking-wider uppercase mb-3">
                    Edición Limitada
                  </span>
                  <h2 className="google-font-title text-4xl md:text-5xl lg:text-6xl !font-bold text-white leading-tight mb-4">
                    Sakura Collection
                  </h2>
                  <h5 className="google-font-text text-white/90 text-xl md:text-xl lg:text-[1.6rem] !font-bold">
                    Belleza Efímera
                  </h5>
                </div>

                <div className="space-y-4">
                  <p className="google-font-text text-white/90 text-lg leading-relaxed">
                    Inspirada en la fugaz belleza de los cerezos en flor. Cada
                    pieza captura la delicadeza y profundidad de la cultura
                    japonesa.
                  </p>
                  <p className="google-font-text text-white/80 text-lg leading-relaxed">
                    Fabricadas con materiales que honran la tradición artesanal
                    y detalles únicos que evocan la serenidad de los jardines
                    japoneses.
                  </p>
                </div>

                {/* 🔹 SOLO ESTA PARTE ES DINÁMICA */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="google-font-text text-white/80 text-sm">
                      Unidades disponibles
                    </span>
                    <span className="google-font-text text-white font-bold">
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

                {/* CTA (ESTÁTICO) */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    asChild
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="bg-white text-[#304131] hover:bg-white/90 font-semibold py-6 text-lg flex-1 group relative overflow-hidden"
                  >
                    <Link
                      to={`/productos/collection/sakura`}
                      className="google-font-text font-bold text-[#304131] text-sm"
                    >
                      Ver colección
                    </Link>
                  </Button>
                </div>

                {/* Features (ESTÁTICAS) */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="text-center">
                    <div className="google-font-text text-white text-[1.3rem] font-bold">24K</div>
                    <div className="google-font-text text-white/70 text-sm">Oro Auténtico</div>
                  </div>
                  <div className="text-center">
                    <div className="google-font-text text-white text-[1.3rem] font-bold">100%</div>
                    <div className="google-font-text text-white/70 text-sm">Hecho a Mano</div>
                  </div>
                  <div className="text-center">
                    <div className="google-font-text text-white text-[1.3rem] font-bold">★ 4.9</div>
                    <div className="google-font-text text-white/70 text-sm">Valoración</div>
                  </div>
                  <div className="text-center">
                    <div className="google-font-text text-white text-[1.3rem] font-bold">3 Días</div>
                    <div className="google-font-text text-white/70 text-sm">Envío Gratis</div>
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
