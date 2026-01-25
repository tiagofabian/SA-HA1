import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { create } from "@/services/contact.service"; // Asegúrate que la ruta sea correcta

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    // Validación de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor ingresa un email válido");
      return;
    }

    setIsLoading(true);

    try {
      // Enviar al backend
      await create(formData);

      toast.success("¡Mensaje enviado con éxito! Te contactaremos pronto.", {
        description: "Gracias por tu interés en nuestras joyas",
      });

      // Limpiar formulario
      setFormData({ name: "", email: "", phone: "", message: "" });

    } catch (error) {
      console.error("Error al enviar contacto:", error);
      toast.error(error.message || "Error al enviar el mensaje. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="google-font-title mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-[3rem]">
            Contáctanos
          </h2>
          <p className="google-font-text mx-auto max-w-2xl text-muted-foreground">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Contact Info (se mantiene igual) */}
          <div className="space-y-6 animate-fade-in-up">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="google-font-text !font-medium text-2xl">Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary p-3">
                    <Mail className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="google-font-text !font-semibold text-foreground">Email</h3>
                    <p className="google-font-text text-muted-foreground">
                      info@hoseki.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary p-3">
                    <Phone className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="google-font-text !font-semibold text-foreground">Teléfono</h3>
                    <p className="google-font-text text-muted-foreground">+569 80085 80085</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary p-3">
                    <MapPin className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="google-font-text !font-semibold text-foreground">Dirección</h3>
                    <p className="google-font-text text-muted-foreground">
                      Calle Perón Perales 123
                      <br />
                      Pudahuel, Chile
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
              <CardTitle className="google-font-text !font-medium text-2xl">Envíanos un Mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="google-font-text !font-semibold">
                    Nombre <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className="google-font-text"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="google-font-text !font-semibold">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="google-font-text"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="google-font-text !font-semibold">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+56912345678"
                    className="google-font-text"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="google-font-text !font-semibold">
                    Mensaje <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={4}
                    className="google-font-text"
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="google-font-text !font-medium w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
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