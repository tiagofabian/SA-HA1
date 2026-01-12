import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";
import { Button } from "./../ui/button";
import { useCart } from "./../../context/cartContext";
import { useUser } from "./../../context/userContext";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useUser();

  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur shadow-sm">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-foreground">
            <img
              src="/hoseki.png"
              alt="hoseki"
              className="w-36 h-36 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="google-font-text text-sm !font-medium text-foreground transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" size="icon" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="google-font-text text-sm font-medium">
                  Hola, {user.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-sm"
                >
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <Link to="/acceder">
                <Button variant="ghost" size="icon" aria-label="Usuario">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Desktop Cart */}
            <Link to="/carrito">
              <Button
                variant="default"
                size="icon"
                className="bg-accent text-accent-foreground hover:bg-accent/90 relative"
                aria-label="Carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-border py-4 md:hidden animate-fade-in">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm font-medium text-foreground transition-colors hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex gap-4 pt-4">
                {user ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 w-full"
                    onClick={handleLogout}
                  >
                    Hola, {user.name}
                  </Button>
                ) : (
                  <Link to="/acceder" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Usuario
                    </Button>
                  </Link>
                )}

                {/* Mobile Cart */}
                <Link to="/carrito" className="flex-1">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Carrito ({totalItems})
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
