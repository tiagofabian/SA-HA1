import { Card, CardContent } from "./../components/ui/card";
import { Button } from "./../components/ui/button";
import collectionAnime from "./../assets/collection-anime.jpg";
import collectionGaming from "./../assets/collection-gaming.jpg";
import collectionJapanese from "./../assets/collection-japanese.jpg";

const collections = [
  {
    id: 1,
    title: "Colección Anime",
    description:
      "Joyas inspiradas en tus series favoritas. Sailor Moon, Attack on Titan, My Hero Academia y más.",
    image: collectionAnime,
    link: "/coleccion/anime",
  },
  {
    id: 2,
    title: "Colección Gaming",
    description:
      "Diseños épicos de tus videojuegos legendarios. Zelda, Pokemon, Kingdom Hearts y más.",
    image: collectionGaming,
    link: "/coleccion/gaming",
  },
  {
    id: 3,
    title: "Colección Japonesa",
    description:
      "Elegancia tradicional japonesa. Cherry blossoms, origami, samurai y cultura nipona.",
    image: collectionJapanese,
    link: "/coleccion/japonesa",
  },
];

const Catalog = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 text-center animate-fade-in-up">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Colecciones Temáticas
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Descubre nuestras exclusivas colecciones diseñadas con pasión para
            los verdaderos fans del anime y los videojuegos
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <Card
              key={collection.id}
              className="group overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-70" />
              </div>
              <CardContent className="relative -mt-20 space-y-4 p-6">
                <div className="rounded-lg bg-card p-6 shadow-lg">
                  <h3 className="mb-2 text-2xl font-bold text-card-foreground">
                    {collection.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {collection.description}
                  </p>
                  <Button
                    variant="default"
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Ir a la Colección
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
