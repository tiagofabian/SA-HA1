import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    toast.success("¡Mensaje enviado con éxito! Te contactaremos pronto.", {
      description: "Gracias por tu interés en nuestras joyas",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Contáctanos
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in-up">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl">Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary p-3">
                    <Mail className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">
                      info@hosekijoyas.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary p-3">
                    <Phone className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Teléfono</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary p-3">
                    <MapPin className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Dirección</h3>
                    <p className="text-muted-foreground">
                      Calle de las Joyas 123
                      <br />
                      Ciudad, País 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card
            className="border-none shadow-md animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <CardHeader>
              <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">
                    Nombre <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="message">
                    Mensaje <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;