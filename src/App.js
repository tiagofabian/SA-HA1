import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";

const App = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [])
  return (
    <Fragment>
      <Nav />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/contacto" element={<Contact />} />

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Fragment>
  )
};

export default App;