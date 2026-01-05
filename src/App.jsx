import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import AdminProductos from "./pages/AdminProductos";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [])
  return (
    <Fragment>
      <Nav />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/crear-producto" element={<AdminProductos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Fragment>
  )
};

export default App;