import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials"

const Testimonials = () => {
  return (
    <section className="bg-muted py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12 text-center animate-fade-in">
          <h2 className="google-font-title mb-3 md:mb-4 text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-[3rem]">
            Nuestros Clientes
          </h2>
          <p className="google-font-text mx-auto max-w-2xl text-muted-foreground text-sm sm:text-base">
            Miles de clientes satisfechos confían en nosotros para sus joyas
            especiales
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 fill-orange-500"
                    />
                  ))}
                </div>
                <p className="google-font-text mb-3 sm:mb-4 text-muted-foreground text-sm sm:text-base italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 sm:pt-4">
                  <div>
                    <p className="google-font-text font-semibold text-foreground text-sm sm:text-base">
                      {testimonial.name}
                    </p>
                    <p className="google-font-text text-xs text-muted-foreground">
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