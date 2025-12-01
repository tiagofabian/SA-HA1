import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "María González",
    rating: 5,
    comment:
      "¡Increíble! El collar de Sailor Moon es exactamente lo que buscaba. La calidad es excelente y el diseño hermoso.",
    date: "Hace 2 semanas",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    rating: 5,
    comment:
      "Compré el anillo de Zelda para mi novia y quedó encantada. El acabado es impecable y llegó muy rápido.",
    date: "Hace 1 mes",
  },
  {
    id: 3,
    name: "Ana Martínez",
    rating: 5,
    comment:
      "Me encantan todas sus colecciones. Ya tengo varias piezas y siempre recibo cumplidos. Totalmente recomendado.",
    date: "Hace 3 semanas",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Miles de clientes satisfechos confían en nosotros para sus joyas
            especiales
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="border-none shadow-md transition-all duration-300 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.date}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;