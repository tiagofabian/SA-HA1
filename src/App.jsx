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
import ProductCreate from "./pages/ProductCreate";
import CategoryCreate from "./pages/CategoryCreate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";
import Checkout from "./pages/Checkout";
import ProductDescription from "./pages/ProductDescription";
import CollectionCreate from "./pages/CollectionCreate";
import MyAccount from "./pages/MyAccount";



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
        <Route path="/productos/:id" element={<ProductDescription />} />
        <Route path="/crear-producto" element={<ProductCreate />} />
        <Route path="/crear-categoria" element={<CategoryCreate />} />
        <Route path="/crear-coleccion" element={<CollectionCreate />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/mi-cuenta/:email" element={<MyAccount />} />
        <Route path="carrito" element={<Cart />} />

<Route path="/checkout" element={
  <ProtectedRoute>
    <Checkout />
  </ProtectedRoute>
  }/>


        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Fragment>
  )
};

export default App;