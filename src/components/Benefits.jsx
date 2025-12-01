import { Shield, Truck, CreditCard, Heart } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description: "Materiales premium y acabados de alta calidad en cada pieza",
  },
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "Envíos gratuitos en compras superiores a $50",
  },
  {
    icon: CreditCard,
    title: "Pago Seguro",
    description: "Múltiples métodos de pago con protección total",
  },
  {
    icon: Heart,
    title: "Diseños Exclusivos",
    description: "Colecciones únicas creadas con amor para los fans",
  },
];

const Benefits = () => {
  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl animate-fade-in">
          Beneficios
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 rounded-full bg-secondary p-6 transition-all duration-300 group-hover:bg-accent group-hover:scale-110 shadow-md">
                  <Icon className="h-8 w-8 text-secondary-foreground group-hover:text-accent-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;