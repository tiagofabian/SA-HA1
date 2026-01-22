import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { saveAddress } from "@/services/address.service";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Validaciones obligatorias
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    const phoneRegex = /^\+?\d{8,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      toast.error("Teléfono inválido. Ej: +56912345678");
      return;
    }

    try {
      // 1️⃣ Registrar usuario
      const { ok, user: registeredUser, message } = await register({
        name: formData.name,
        phone: formData.phone || null,
        email: formData.email,
        password: formData.password,
      });

      if (!ok) {
        toast.error(message || "Error al registrar el usuario");
        return;
      }
      console.log("sadasdasdasd", registeredUser.id)
      // 2️⃣ Crear dirección solo si hay al menos un campo completado
      if (formData.address || formData.city || formData.region || formData.postalCode) {
        const payload = {
          address: formData.address || "",
          city: formData.city || "",
          region: formData.region || "",
          zip_code: formData.postalCode ? Number(formData.postalCode) : null,
          id_customer: registeredUser.id,
        };

        await saveAddress(payload);
      }

      toast.success(`¡Registro exitoso! Bienvenido/a ${registeredUser.name || registeredUser.email}`);

      // 3️⃣ Limpiar formulario
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        address: "",
        city: "",
        region: "",
        postalCode: "",
      });

      // 4️⃣ Redirigir al home o login
      navigate("/");
    } catch (error) {
      console.error("Error en registro:", error);
      toast.error("Error del servidor, inténtalo más tarde");
    }
  };

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-12">
        <Card className="mx-auto max-w-xl border-none shadow-md animate-fade-in-up">
          <CardHeader className="text-center">
            <CardTitle className="google-font-title text-3xl font-bold">
              Crear Cuenta
            </CardTitle>
            <p className="google-font-text text-muted-foreground">
              Regístrate para una experiencia personalizada
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div>
                <Label className="google-font-text !font-semibold">Nombre *</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  required
                />
              </div>

              {/* Teléfono */}
              <div>
                <Label className="google-font-text !font-semibold">Teléfono</Label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+56912345678"
                />
              </div>

              {/* Email */}
              <div>
                <Label className="google-font-text !font-semibold">Email *</Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="cliente@email.com"
                  required
                />
              </div>

              {/* Contraseña */}
              <div>
                <Label className="google-font-text !font-semibold">Contraseña *</Label>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  required
                />
              </div>

              {/* Dirección */}
              <div className="pt-4 border-t">
                <h3 className="google-font-text font-semibold text-lg mb-2">
                  Dirección de envío (opcional)
                </h3>
                <div className="space-y-3">
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Dirección"
                  />
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ciudad"
                  />
                  <Input
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="Región"
                  />
                  <Input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Código Postal"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Registrarse
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Register;