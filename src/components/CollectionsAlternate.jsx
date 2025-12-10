import { Button } from "./../components/ui/button";
import { collections } from "@/lib/collections-alternate";

const CollectionsAlternate = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header - igual */}

        {/* Colecciones con layout alternado */}
        <div className="space-y-24">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-10 lg:gap-16 animate-fade-in-up`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Imagen */}
              <div className="w-full lg:w-1/2">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-[450px] object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>

              {/* Contenido */}
              <div className="w-full lg:w-1/2">
                <div className="space-y-8">
                  <div>
                    <h3 className="google-font-title text-3xl font-bold text-foreground md:text-4xl lg:text-7xl mb-4">
                      {collection.title}
                    </h3>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {collection.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <Button
                      className="bg-[#4f7e6b] hover:bg-[#5e8c77] text-white px-10 py-7 text-lg font-semibold rounded-full hover:shadow-xl transition-all duration-300"
                      asChild
                    >
                      <a href={collection.link}>
                        Explorar Colección
                        <svg
                          className="ml-2 w-5 h-5"
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
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsAlternate;
