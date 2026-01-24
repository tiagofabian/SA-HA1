import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import OrderConfirmation from "./pages/OrderConfirmation"; // Asegúrate de tener este import

// Importar los providers
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
      {/* Envolver toda la app con los providers */}
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
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/nosotros" element={<AboutUs />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/products/:name/:slug" element={<Products />} />
            <Route path="/producto/:id" element={<ProductDescription />} />
            
            {/* Rutas protegidas */}
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }/>
            
            <Route path="/order-confirmation" element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }/>
            
            <Route path="/mi-cuenta/:email" element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }/>

            {/* Rutas de admin - también protegidas */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }>
              <Route path="gestion-usuario" element={<ManageUser />} />
              <Route path="gestion-producto" element={<ManageProduct />} />
              <Route path="gestion-categoria" element={<ManageCategory />} />
              <Route path="gestion-coleccion" element={<ManageCollection />} />
            </Route>
            
            {/* Rutas públicas */}
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/carrito" element={<Cart />} />
            
            {/* Ruta para páginas no encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Fragment>
  );
};

export default App;