import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  LogIn,
  UserPlus,
  LogOut,
  UserCircle,
} from "lucide-react";

import { Button } from "../ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

// services
import { fetchProductsByTerm } from "@/services/product.service";

let searchTimeout; // para debounce

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // =========================
  // Búsqueda de productos
  // =========================
  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([]);
      return;
    }

    // Debounce: esperar 500ms antes de hacer la petición
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      try {
        const results = await fetchProductsByTerm(searchTerm);
        setProducts(results);
      } catch (err) {
        console.error("Error buscando productos:", err);
        setProducts([]);
      }
    }, 500);

    // Limpiar timeout al desmontar
    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

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

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-2 py-1 border rounded w-64 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              {/* Dropdown de resultados */}
              {products.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded shadow-lg max-h-64 overflow-y-auto z-50">
                  {products.map((p) => (
                    <Link
                      key={p.id_product}
                      to={`/productos/${p.id_product}`}
                      className="block px-3 py-2 hover:bg-accent/10 text-sm"
                      onClick={() => setSearchTerm("")} // limpia input al click
                    >
                      {p.product_name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Usuario */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-2"
                aria-label="Usuario"
              >
                <User className="h-5 w-5" />
                {user && (
                  <span className="text-sm font-medium">{user.name}</span>
                )}
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-50 overflow-hidden">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-3 border-b bg-muted/40">
                        <img
                          src="/hoseki.png"
                          alt="logo"
                          className="h-8 w-8 object-contain"
                        />
                        <span className="text-sm font-medium">Mi cuenta</span>
                      </div>

                      <Link
                        to={`/mi-cuenta/${user.email}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent/10"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserCircle className="h-4 w-4" /> Mi perfil
                      </Link>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-left hover:bg-accent/10"
                      >
                        <LogOut className="h-4 w-4" /> Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/iniciar-sesion"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent/10"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LogIn className="h-4 w-4" /> Iniciar sesión
                      </Link>

                      <Link
                        to="/registro"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent/10"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserPlus className="h-4 w-4" /> Registrarse
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Carrito */}
            <Link to="/carrito">
              <Button
                size="icon"
                className="relative bg-accent text-accent-foreground hover:bg-accent/90"
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
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;