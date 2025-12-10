import React from 'react'
import { Heart } from 'lucide-react';

const AboutProject = () => {
  return (
    <div className="mx-auto mb-20 max-w-6xl">
      <div className="mb-12 text-center animate-fade-in-up">
        <h2 className="google-font-title mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-7xl">
          Nuestra Historia y Propósito
        </h2>
        <div className="mx-auto mb-8 h-1 w-20 bg-accent"></div>
      </div>

      {/* Descripción del Proyecto */}
      <div className="grid gap-12 md:grid-cols-2">
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

        {/* Foto Grupal
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
        </div>*/}
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
  )
}

export default AboutProject
