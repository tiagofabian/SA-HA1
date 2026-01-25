import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price || 0) * item.quantity,
    0
  );

  const shippingCost = totalPrice > 50000 ? 0 : 5000;
  const finalTotal = totalPrice + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto my-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Parece que aún no has agregado productos a tu carrito.
            Explora nuestro catálogo y encuentra joyas únicas.
          </p>
        </div>
        <Link to="/catalogo">
          <Button className="px-8 py-3 text-lg text-white bg-gradient-to-r mt-10 from-gray-900 to-black hover:from-gray-800 hover:to-gray-900">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Explorar catálogo
          </Button>
        </Link>
      </div>
    );
  }

return (
  <div className="max-w-7xl mx-auto my-8 md:my-16 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Productos - Lado izquierdo */}
      <div className="lg:w-2/3">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Header del carrito */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Carrito de compras
              </h1>
              <p className="text-gray-600 mt-1">
                {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Vaciar carrito
            </Button>
          </div>

          {/* Lista de productos */}
          <div className="space-y-6">
            {cart.map((item) => {
              // USAMOS DIRECTAMENTE imageSrc QUE YA ES LA PRIMERA IMAGEN
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200"
                >
                  {/* Imagen - usa item.imageSrc directamente */}
                  <div className="sm:w-32 sm:h-32 w-full h-48 flex-shrink-0">
                    <img
                      src={item.imageSrc}  // ← DIRECTAMENTE imageSrc
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ${Number(item.price || 0).toLocaleString("es-CL")} c/u
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          ${(Number(item.price || 0) * item.quantity).toLocaleString("es-CL")}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}
                        </p>
                      </div>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decreaseQuantity(item.cartProductId || item.id)}
                          className="h-9 w-9 rounded-full"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="font-bold text-lg w-8 text-center">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addToCart(item)}
                          className="h-9 w-9 rounded-full"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Botón eliminar */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.cartProductId || item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botón continuar comprando */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link to="/catalogo">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Seguir comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Resumen - Lado derecho */}
      <div className="lg:w-1/3">
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
            Resumen del pedido
          </h2>

          {/* Detalles del pedido */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${totalPrice.toLocaleString("es-CL")}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Envío</span>
              <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                {shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString("es-CL")}`}
              </span>
            </div>

            {shippingCost > 0 && totalPrice < 50000 && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 text-center">
                  ¡Faltan ${(50000 - totalPrice).toLocaleString("es-CL")} para envío gratis!
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${finalTotal.toLocaleString("es-CL")}
                </span>
              </div>
              <p className="text-sm text-gray-500 text-right mt-1">
                IVA incluido
              </p>
            </div>
          </div>

          {/* Botón finalizar compra */}
          <Button
            className="w-full py-3 text-lg text-white bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900"
            onClick={() => navigate("/checkout")}
          >
            Finalizar compra
          </Button>

          {/* Garantías */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span className="text-gray-600">Envío gratis sobre $50.000</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span className="text-gray-600">Devolución en 30 días</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span className="text-gray-600">Garantía de 1 año</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Cart;