import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { Mail, Lock, LogIn } from "lucide-react";

// metodos http
import { login } from "@/services/auth.service";
import { fetchCustomerByEmail } from "@/services/customer.service";


const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    try {
      // 1️⃣ Resolver la promesa
      // const userFound = await fetchCustomerByEmail(formData.email);
      // console.log("userFound", userFound);

      // if (!userFound) {
      //   toast.error("Email o contraseña incorrectos");
      //   return;
      // }

      // 2️⃣ Resolver login (también es async)
      const authData = await login({
        email: formData.email,
        password: formData.password
      });

      console.log("login", authData);

      toast.success(`¡Bienvenido/a ${userFound.name}! 💎`);

      navigate("/");

      setFormData({ email: "", password: "" });

    } catch (error) {
      if (error.message.includes("404")) {
        toast.error("Email o contraseña incorrectos");
      } else {
        toast.error("Error del servidor");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = () => {
    toast.info("Login con Google (pendiente de integración)");
  };

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="google-font-title mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-[3rem]">
            Iniciar Sesión
          </h2>
          <p className="google-font-text mx-auto max-w-2xl text-muted-foreground">
            Accede a tu cuenta para continuar
          </p>
        </div>

        {/* Card */}
        <div className="mx-auto max-w-md animate-fade-in-up">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="google-font-text !font-medium text-2xl text-center">
                Bienvenido/a
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <Label className="google-font-text !font-semibold">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="pl-10 google-font-text"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <Label className="google-font-text !font-semibold">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="pl-10 google-font-text"
                      required
                    />
                  </div>
                </div>

                {/* Button */}
                <Button
                  type="submit"
                  className="google-font-text !font-medium w-full bg-accent text-accent-foreground hover:bg-accent/90 flex gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Ingresar
                </Button>
              </form>

              {/* Divider */}
              <div className="relative text-center my-4">
                <span className="bg-background px-4 text-sm text-muted-foreground">
                  o
                </span>
                <div className="absolute inset-x-0 top-1/2 h-px bg-border -z-10" />
              </div>

              {/* Google Login */}
              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                className="google-font-text w-full flex gap-2"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-4 w-4"
                />
                Ingresar con Google
              </Button>

              {/* Register link */}
              <p className="google-font-text text-center text-sm text-muted-foreground mt-4">
                ¿No tienes cuenta?{" "}
                <a
                  href="/registro"
                  className="font-semibold text-accent hover:underline"
                >
                  Regístrate aquí
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
