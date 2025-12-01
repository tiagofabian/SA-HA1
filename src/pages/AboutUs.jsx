import japanLandscape from "./../assets/japan-landscape.jpg";
import { Button } from "./../components/ui/button";


const AboutUs = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-12">
        {/* Japan Landscape Banner */}
        <div className="relative mb-16 h-64 overflow-hidden rounded-2xl shadow-xl animate-fade-in">
          <img
            src={japanLandscape}
            alt="Paisaje de Japón"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-[2px]">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
              Inspirado en Japón
            </h2>
          </div>
        </div>

        {/* About Content */}
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center animate-fade-in-up">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Nuestra Historia
            </h2>
            <div className="mx-auto h-1 w-20 bg-accent mb-8"></div>
          </div>

          <div className="space-y-8 text-muted-foreground animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <p className="text-lg leading-relaxed">
              Somos una joyería especializada en el mundo del anime y los
              videojuegos. Nuestro objetivo es unir la elegancia y la calidad de
              la joyería tradicional con la pasión y creatividad del mundo otaku
              y geek.
            </p>
            <p className="text-lg leading-relaxed">
              Cada pieza de nuestra colección está cuidadosamente diseñada por
              artesanos que comparten el amor por estas culturas. Utilizamos
              materiales premium como plata de ley, oro y gemas naturales para
              crear joyas que no solo lucen hermosas, sino que también cuentan
              una historia.
            </p>
            <p className="text-lg leading-relaxed">
              Desde las tierras místicas de tus animes favoritos hasta los
              mundos épicos de los videojuegos más legendarios, transformamos
              estos elementos icónicos en piezas de joyería que puedes llevar
              contigo todos los días.
            </p>

            <div className="flex justify-center pt-8">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg transition-all"
              >
                Conoce Más Sobre Nosotros
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
