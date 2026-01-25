import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Páginas públicas
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import RingsCategory from "./pages/categories/RingsCategory"
import EarringsCategory from "./pages/categories/EarringsCategory";
import BraceletsCategory from "./pages/categories/BraceletsCategory";
import NecklacesCategory from "./pages/categories/NecklacesCategory";


// Páginas protegidas (requieren login)
import Checkout from "./pages/Checkout";
import ProductDescription from "./pages/ProductDescription";
import MyAccount from "./pages/MyAccount";
import OrderConfirmation from "./pages/OrderConfirmation";

// Páginas de admin
import AdminPanel from "./pages/AdminPanel";
import ManageUser from "./pages/admin/ManageUser";
import ManageProduct from "./pages/admin/ManageProduct";
import ManageCategory from "./pages/admin/ManageCategory";
import ManageCollection from "./pages/admin/ManageCollection";
import ManageContact from "./pages/admin/ManageContact";

// Components
import Products from "./components/reuse/Products";

// Providers
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const App = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <Fragment>
      <AuthProvider>
        <CartProvider>
          <Nav />
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            {/* ========== RUTAS PÚBLICAS ========== */}
            <Route path="/" element={<Home />} />
            <Route path="/categoria" element={<Categories />}>
              <Route path="anillos" index element={<RingsCategory/>} />
              <Route path="aros" element={<EarringsCategory/>} />
              <Route path="pulseras" element={<BraceletsCategory/>} />
              <Route path="collares" element={<NecklacesCategory/>} />
            </Route>
            <Route path="/nosotros" element={<AboutUs />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/productos/:name/:slug" element={<Products />} />
            <Route path="/producto/:id" element={<ProductDescription />} />
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/carrito" element={<Cart />} />

            
            {/* ========== RUTAS PROTEGIDAS (requieren login) ========== */}
            <Route element={<ProtectedLayout />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/mi-cuenta/:email" element={<MyAccount />} />
            </Route>
            
            {/* ========== RUTAS SOLO PARA ADMIN ========== */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminPanel />}>
                <Route index element={<ManageUser />} /> {/* Ruta por defecto */}
                <Route path="gestion-usuario" element={<ManageUser />} />
                <Route path="gestion-producto" element={<ManageProduct />} />
                <Route path="gestion-categoria" element={<ManageCategory />} />
                <Route path="gestion-coleccion" element={<ManageCollection />} />
                <Route path="gestion-contacto" element={<ManageContact />} />
              </Route>
            </Route>
            
            {/* ========== RUTA 404 ========== */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Fragment>
  );
};

export default App;