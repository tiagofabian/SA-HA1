import React from 'react'
import { Button } from "@/components/ui/button";

const DiscoverJewels = () => {
  return (
    <div className="mx-auto mt-20 max-w-4xl text-center animate-fade-in-up" style={{ animationDelay: "700ms" }}>
      <div className="rounded-2xl shadow-lg from-primary/20 to-accent/20 p-8">
        <h3 className="google-font-text mb-4 text-2xl !font-semibold text-foreground">
          ¿Listo para Descubrir Joyas con Historia?
        </h3>
        <p className="google-font-text mb-6 text-muted-foreground">
          Explora nuestra colección y encuentra la pieza que habla a tu corazón otaku.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="google-font-text btn-green-arcadia bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all"
          >
            <a href="/categoria">Ver Categorías</a>
          </Button>
          {/* <Button
            size="lg"
            variant="outline"
            className="google-font-text btn-green-arcadia border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Contáctanos
          </Button> */}
        </div>
      </div>
    </div>
  )
}

export default DiscoverJewels
