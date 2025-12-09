// AboutUs.jsx - Versión Actualizada

import japanLandscape from "./../assets/japan-landscape.jpg";
import fotoGrupal from "./../assets/foto_grupal.png";
import { Button } from "./../components/ui/button";
import { Github, Linkedin, Heart } from 'lucide-react';

import tiagoPhoto from "./../assets/team/tiago.png";
import francisPhoto from "./../assets/team/francis.png";
import diegoPhoto from "./../assets/team/diego.png";
import belenPhoto from "./../assets/team/belen.png";
import brahimPhoto from "./../assets/team/brahim.png";
import hectorPhoto from "./../assets/team/hector.png";

const teamMembers = [
  {
    id: 1,
    name: "Tiago Alcázar",
    role: "Fundador & Diseñador Principal",
    bio: "Apasionado del anime y joyería por más de 10 años. Creador de la visión Hoseki.",
    animeFav: "Naruto Shippuden",
    github: "alexchen",
    linkedin: "alexchen",
    photo: tiagoPhoto,  // ← AGREGAR FOTO
  },
  {
    id: 2,
    name: "Francis Chavez",
    role: "Artista & Joyera",
    bio: "Especialista en técnicas tradicionales japonesas. Transforma conceptos en joyas.",
    animeFav: "Sailor Moon",
    github: "sakurat",
    linkedin: "sakura-tanaka",
    photo: francisPhoto,  // ← AGREGAR FOTO
  },
  {
    id: 3,
    name: "Diego Villagrán",
    role: "Desarrollador Full-Stack",
    bio: "Geek de corazón, asegura que la magia de Hoseki llegue a tu pantalla.",
    animeFav: "Attack on Titan",
    github: "marcord",
    linkedin: "marco-rodriguez",
    photo: diegoPhoto,  // ← AGREGAR FOTO
  },
  {
    id: 4,
    name: "Belén Almendros",
    role: "Marketing & Comunidad",
    bio: "Conecta a los fans con piezas únicas que cuentan sus historias.",
    animeFav: "Demon Slayer",
    github: "lunam",
    linkedin: "luna-martinez",
    photo: belenPhoto,  // ← AGREGAR FOTO
  },
  {
    id: 5,
    name: "Brahim González",
    role: "Especialista en Calidad",
    bio: "Garantiza que cada pieza cumpla con los más altos estándares de excelencia.",
    animeFav: "One Piece",
    github: "kenjis",
    linkedin: "kenji-sato",
    photo: brahimPhoto,  // ← AGREGAR FOTO
  },
  {
    id: 6,
    name: "Héctor Chacón",
    role: "Diseñador UX/UI",
    bio: "Crea experiencias digitales tan elegantes como nuestras joyas físicas.",
    animeFav: "Jujutsu Kaisen",
    github: "valcosta",
    linkedin: "valeria-costa",
    photo: hectorPhoto,  // ← AGREGAR FOTO
  }
];


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

        {/* Sobre el Proyecto */}
        <div className="mx-auto mb-20 max-w-6xl">
          <div className="mb-12 text-center animate-fade-in-up">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Nuestra Historia y Propósito
            </h2>
            <div className="mx-auto mb-8 h-1 w-20 bg-accent"></div>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Descripción del Proyecto */}
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-2xl font-bold text-primary">
                ¿Qué es Hoseki?
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  <span className="font-semibold text-foreground">Hoseki</span> (宝石) significa "gema preciosa" en japonés. Somos más que una joyería: somos un puente entre la elegancia atemporal y la pasión contemporánea por el anime.
                </p>
                <p className="leading-relaxed">
                  Nacimos de una simple observación: los fans del anime merecen joyas que reflejen su pasión con la misma calidad y sofisticación que cualquier pieza de lujo.
                </p>
                <p className="leading-relaxed">
                  Cada creación Hoseki combina:
                </p>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li className="flex items-start">
                    <Heart className="mr-2 mt-1 h-4 w-4 text-accent" />
                    <span><strong>Materiales premium</strong>: Plata 925, oro de 18k, gemas naturales</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="mr-2 mt-1 h-4 w-4 text-accent" />
                    <span><strong>Diseños auténticos</strong>: Fieles a los originales pero con toque elegante</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="mr-2 mt-1 h-4 w-4 text-accent" />
                    <span><strong>Artesanía detallada</strong>: Cada pieza cuenta una historia</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Foto Grupal */}
            <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="overflow-hidden rounded-xl shadow-2xl transition-transform hover:scale-[1.02] duration-300">
                <img
                  src={fotoGrupal}
                  alt="Equipo Hoseki - Creadores apasionados"
                  className="h-full w-full object-cover"
                />
                <div className="bg-primary/90 p-4 text-center">
                  <p className="font-semibold text-white">
                    El equipo Hoseki - Unidos por el anime y la excelencia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Nuestra Misión */}
          <div className="mt-12 rounded-2xl bg-primary/5 p-8 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <h3 className="mb-4 text-2xl font-bold text-primary">
              Nuestra Misión
            </h3>
            <blockquote className="border-l-4 border-accent pl-6">
              <p className="text-lg italic text-muted-foreground">
                "Transformar la pasión por el anime en herencias tangibles. Creemos que las joyas deben ser más que adornos: deben ser extensiones de las historias que amamos y los personajes que nos inspiran."
              </p>
            </blockquote>
          </div>
        </div>

        {/* Equipo */}
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Conoce al Equipo
            </h2>
            <div className="mx-auto mb-8 h-1 w-20 bg-accent"></div>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Seis apasionados, una visión: crear la joyería de anime más elegante del mundo.
            </p>
          </div>

          {/* Grid de Miembros CON FOTOS CUADRADAS */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* CONTENEDOR CUADRADO */}
                <div className="aspect-square overflow-hidden"> {/* ← Clave aquí */}
                  <img
                    src={member.photo}
                    alt={`Foto de ${member.name}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{
                      objectPosition: member.photoStyle || 'center center'
                    }}
                  />

                  {/* Badge decorativo */}
                  <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 shadow-md">
                    <span className="font-bold text-primary">#{member.id}</span>
                  </div>
                </div>

                {/* CONTENIDO DE LA TARJETA */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {member.role}
                    </p>
                  </div>

                  <p className="mb-4 text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Anime favorito con icono */}
                  <div className="mb-4 rounded-lg bg-secondary/20 p-3">
                    <div className="flex items-center">
                      <svg className="mr-2 h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">Anime Favorito:</span>{' '}
                        <span className="font-medium text-accent">{member.animeFav}</span>
                      </p>
                    </div>
                  </div>

                  {/* Redes sociales */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <a
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                        aria-label={`GitHub de ${member.name}`}
                        title="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://linkedin.com/in/${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                        aria-label={`LinkedIn de ${member.name}`}
                        title="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>

                    {/* Etiqueta de rol */}
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {member.role.split('&')[0].trim()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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