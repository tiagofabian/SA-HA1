import { useState } from "react";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";
import { Button } from "./../ui/button";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-foreground">
            <img src="/hoseki.png" alt="hoseki" class="w-36 h-36 object-contain" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" size="icon" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Usuario">
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              aria-label="Carrito"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-border py-4 md:hidden animate-fade-in">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-sm font-medium text-foreground transition-colors hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-4 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <User className="mr-2 h-4 w-4" />
                  Usuario
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Carrito
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
