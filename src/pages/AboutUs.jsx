// AboutUs.jsx - Versión Actualizada

import japanLandscape from "./../assets/japan-landscape.jpg";
// import fotoGrupal from "./../assets/foto_grupal.png";
import AboutProject from "../components/AboutProject"
import Team from "../components/Team"
import { teamMembers } from "@/lib/team";
import { Button } from "./../components/ui/button";

const AboutUs = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-12">

        {/* Japan Landscape Banner */}
        <div className="relative mb-16 h-64 overflow-hidden rounded-2xl shadow-xl animate-fade-in">
          <img
            src={japanLandscape}
            alt="Paisaje de Japón con cerezos"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-primary/40 backdrop-blur-[1px]">
            <div className="text-center">
              <h2 className="mb-2 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
                宝石 - HOSEKI
              </h2>
              <p className="text-xl text-white/90 drop-shadow-md">
                あなたのものはたり、あなたのほうせき - Tu historia, tu joya
              </p>
            </div>
          </div>
        </div>
        
        <AboutProject/>
        <Team teamMembers={teamMembers} />

        {/* CTA Final */}
        <div className="mx-auto mt-20 max-w-4xl text-center animate-fade-in-up" style={{ animationDelay: "700ms" }}>
          <div className="rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 p-8">
            <h3 className="mb-4 text-2xl font-bold text-foreground">
              ¿Listo para Descubrir Joyas con Historia?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Explora nuestra colección y encuentra la pieza que habla a tu corazón otaku.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all"
              >
                Ver Colección Completa
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Contáctanos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;