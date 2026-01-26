import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { fetchCollectionsWithProductsBySlug } from "@/services/collection.service";
import { Link } from "react-router-dom";

const CollectionsAlternate = ({
  slugs = ["anime", "videojuegos", "cultura-japonesa"],
}) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCollectionsWithProductsBySlug(slugs);
        setCollections(data);
      } catch (err) {
        console.error("Error cargando colecciones:", err);
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []); // ⚡

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500">
        Cargando colecciones...
      </p>
    );
  }

  if (!collections.length) {
    return (
      <p className="text-center py-20 text-gray-500">
        No hay colecciones disponibles
      </p>
    );
  }

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="space-y-24">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-10 lg:gap-16`}
            >
              {/* Imagen */}
              <div className="w-full lg:w-1/2">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={collection.image ?? "/placeholder.jpg"}
                    alt={collection.name}
                    className="w-full h-[450px] object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>

              {/* Contenido */}
              <div className="w-full lg:w-1/2 space-y-8">
                <h3 className="google-font-title text-3xl font-bold md:text-4xl">
                  {collection.name}
                </h3>

                <p className="google-font-text text-muted-foreground text-lg">
                  {collection.description}
                </p>

                {/* CTA dinámico */}
                <Button
                  className="bg-[#4f7e6b] hover:bg-[#5e8c77] text-white px-10 py-7 text-lg rounded-full"
                  asChild
                >
                  <Link
                    to={`/productos/collection/${collection.slug}`}
                    className="flex items-center gap-2"
                  >
                    Explorar Colección
                    <svg
                      className="w-5 h-5"
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
                  </Link>
                </Button>

                {/* 🔹 BONUS: ya tienes los productos si los quieres */}
                {/* <p className="text-sm text-muted-foreground">
                  {collection.products.length} productos disponibles
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsAlternate;
