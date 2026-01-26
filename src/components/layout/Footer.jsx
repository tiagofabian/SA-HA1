import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-6 py-12 md:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="google-font-text text-[1.4rem] !font-bold">Hoseki Joyas</h3>
            <p className="google-font-text text-[0.9rem] text-primary-foreground/80">
              Joyería artesanal inspirada en anime y videojuegos. Calidad
              para verdaderos fans.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="google-font-text text-[1rem] !font-semibold">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#inicio"
                  className="google-font-text text-[0.85rem] text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/categoria"
                  className="google-font-text text-[0.85rem] text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  Categoría
                </a>
              </li>
              <li>
                <a
                  href="/nosotros"
                  className="google-font-text text-[0.85rem] text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="/contacto"
                  className="google-font-text text-[0.85rem] text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="google-font-text text-[1rem] !font-semibold">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li className="google-font-text text-[0.85rem] text-primary-foreground/80">
                Envío gratis +$50.000
              </li>
              <li className="google-font-text text-[0.85rem] text-primary-foreground/80">
                Garantía de calidad
              </li>
              <li className="google-font-text text-[0.85rem] text-primary-foreground/80">
                Devoluciones 30 días
              </li>
              <li className="google-font-text text-[0.85rem] text-primary-foreground/80">
                Soporte 24/7
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="google-font-text text-[1rem] !font-semibold">Redes Sociales</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary-foreground/10 p-2 transition-all hover:bg-primary-foreground/20 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary-foreground/10 p-2 transition-all hover:bg-primary-foreground/20 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary-foreground/10 p-2 transition-all hover:bg-primary-foreground/20 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary-foreground/10 p-2 transition-all hover:bg-primary-foreground/20 hover:scale-110"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center">
          <p className="google-font-text text-[0.8rem] text-primary-foreground/70">
            © {currentYear} Hoseki Joyas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
