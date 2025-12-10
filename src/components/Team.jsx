import React from 'react'
import { Github, Linkedin } from 'lucide-react';

const Team = ({ teamMembers }) => {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <h2 className="google-font-title mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-7xl">
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
  )
}

export default Team
