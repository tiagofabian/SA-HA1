import { useState, useEffect, useRef } from "react";
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
import { fetchProductsByTerm } from "@/services/product.service";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setProducts([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Debounce para búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const results = await fetchProductsByTerm(searchTerm);
        setProducts(results);
      } catch (err) {
        console.error("Error buscando productos:", err);
        setProducts([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Categorías", href: "/categoria" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    setProducts([]);
    setSearchTerm("");
    setShowMobileSearch(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Primera fila - Logo y acciones móviles */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/hoseki.png"
              alt="hoseki"
              className="h-auto w-32 sm:w-36 object-contain"
            />
          </Link>

          {/* Desktop Navigation Links - Solo visible en md+ */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions - Solo visible en md+ */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Search Desktop */}
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                />
              </form>

              {/* Dropdown resultados */}
              {products.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                  {products.map((p) => (
                    <Link
                      key={p.id}
                      to={`/producto/${p.id}`}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-sm border-b last:border-b-0"
                      onClick={() => {
                        setSearchTerm("");
                        setProducts([]);
                      }}
                    >
                      <img
                        src={p.imageUrls?.[0] || "/placeholder.png"}
                        alt={p.name}
                        className="h-10 w-10 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{p.name}</p>
                        <p className="text-xs text-gray-500">${p.price?.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu Desktop */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                {user && (
                  <span className="text-sm font-medium hidden lg:inline">
                    {user.name?.split(" ")[0]}
                  </span>
                )}
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50 overflow-hidden">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">
                          Hola, {user.name?.split(" ")[0]}
                        </p>
                      </div>
                      <Link
                        to={`/mi-cuenta/${user.id}`}
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserCircle className="h-4 w-4" />
                        Mi perfil
                      </Link>
                      {user.rol === "ADMIN" && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          Panel Admin
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 border-t"
                      >
                        <LogOut className="h-4 w-4" />
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/iniciar-sesion"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LogIn className="h-4 w-4" />
                        Iniciar sesión
                      </Link>
                      <Link
                        to="/registro"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 border-t"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserPlus className="h-4 w-4" />
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart Desktop */}
            <Link to="/carrito">
              <Button
                size="sm"
                className="relative bg-accent hover:bg-accent/90"
              >
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Actions - Solo visible en móvil */}
          <div className="flex md:hidden items-center gap-2">
            {/* Search Button Mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="h-10 w-10"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart Mobile */}
            <Link to="/carrito">
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Menu Button Mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar - Solo visible cuando se activa */}
        {showMobileSearch && (
          <div className="md:hidden px-4 pb-3 border-t">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                autoFocus
              />
            </form>
            {/* Resultados móviles */}
            {products.length > 0 && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {products.map((p) => (
                  <Link
                    key={p.id}
                    to={`/producto/${p.id}`}
                    className="flex items-center gap-3 px-3 py-2 border-b last:border-b-0 hover:bg-gray-50"
                    onClick={() => {
                      setSearchTerm("");
                      setProducts([]);
                      setShowMobileSearch(false);
                    }}
                  >
                    <img
                      src={p.imageUrls?.[0] || "/placeholder.png"}
                      alt={p.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-gray-500">${p.price?.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu - Solo visible cuando está abierto */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            {/* User Info Mobile */}
            <div className="px-4 py-3 bg-gray-50">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">Inicia sesión para mejores beneficios</p>
              )}
            </div>

            {/* Navigation Links Mobile */}
            <div className="px-2 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* User Actions Mobile */}
              <div className="border-t pt-2 mt-2">
                {user ? (
                  <>
                    <Link
                      to={`/mi-cuenta/${user.id}`}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserCircle className="h-5 w-5" />
                      Mi cuenta
                    </Link>
                    {user.rol === "ADMIN" && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        Panel Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/iniciar-sesion"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="h-5 w-5" />
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/registro"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus className="h-5 w-5" />
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;