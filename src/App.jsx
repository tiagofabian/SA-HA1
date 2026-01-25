import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Products from "./components/reuse/Products";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import ManageProduct from "./pages/ManageProduct";
import ManageCategory from "./pages/ManageCategory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";
import Checkout from "./pages/Checkout";
import ProductDescription from "./pages/ProductDescription";
import ManageCollection from "./pages/ManageCollection";
import MyAccount from "./pages/MyAccount";
import AdminPanel from "./pages/AdminPanel";
import ManageUser from "./pages/ManageUser";
import SearchResults from "./pages/SearchResults";


const App = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [])
  return (
    <div className="app-container min-h-screen flex flex-col">
      <Nav />
      <ToastContainer />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:term" element={<SearchResults />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/products/:name/:slug" element={<Products />} />
          <Route path="/producto/:id" element={<ProductDescription />} />
          <Route path="/admin/" element={<AdminPanel />}>
            <Route path="gestion-usuario" element={<ManageUser />} />
            <Route path="gestion-producto" element={<ManageProduct />} />
            <Route path="gestion-categoria" element={<ManageCategory />} />
            <Route path="gestion-coleccion" element={<ManageCollection />} />
          </Route>
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/mi-cuenta/:email" element={<MyAccount />} />
          <Route path="/carrito" element={<Cart />} />

          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }/>


          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
};

export default App;