import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Dirección, 2: Pago, 3: Confirmación
  const [loading, setLoading] = useState(false);

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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            No hay productos en el carrito
          </h2>
          <p className="text-gray-600 mb-8">
            Agrega productos al carrito para proceder con el pago.
          </p>
          <Link to="/catalogo">
            <Button className="px-8 py-3 text-lg">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Volver al catálogo
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitOrder = () => {
  setLoading(true);
  // Simulamos el procesamiento del pago
  setTimeout(() => {
    setLoading(false);
    clearCart();
    
    // Podríamos pasar datos del pedido por estado de navegación
    navigate("/order-confirmation", { 
      state: { 
        orderData: {
          items: cart,
          total: finalTotal,
          // ... otros datos del formulario
        }
      }
    });
  }, 3000);
};

  return (
    <div className="max-w-7xl mx-auto my-8 md:my-16 px-4 sm:px-6 lg:px-8">
      {/* Encabezado con pasos */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Finalizar compra
        </h1>
        
        <div className="flex items-center justify-between max-w-2xl">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <span className={`ml-2 font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
              Dirección
            </span>
          </div>
          
          <div className="flex-1 h-1 mx-4 bg-gray-200"></div>
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <span className={`ml-2 font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
              Pago
            </span>
          </div>
          
          <div className="flex-1 h-1 mx-4 bg-gray-200"></div>
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
            <span className={`ml-2 font-medium ${step >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>
              Confirmación
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Formulario - Lado izquierdo */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Información de envío
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="+56 9 1234 5678"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Calle Principal 123"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Santiago"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Región *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Metropolitana"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Código postal *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="1234567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instrucciones de entrega (opcional)
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      rows="3"
                      placeholder="Ej: Llamar antes de llegar, dejar con conserjería, etc."
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Método de pago
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {['💳 Tarjeta', '📱 Webpay', '🏦 Transferencia', '💰 Efectivo'].map((method, index) => (
                      <button
                        key={index}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-900 transition-all text-center"
                      >
                        <div className="text-2xl mb-2">{method.split(' ')[0]}</div>
                        <div className="text-sm font-medium">{method.split(' ')[1]}</div>
                      </button>
                    ))}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre en la tarjeta *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="JUAN P PEREZ"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de tarjeta *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de expiración *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="MM/AA"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de navegación */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Button>
              ) : (
                <Link to="/cart">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al carrito
                  </Button>
                </Link>
              )}
              
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  {step === 1 ? 'Continuar al pago' : 'Revisar pedido'}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitOrder}
                  disabled={loading}
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Procesando pago...
                    </>
                  ) : (
                    'Confirmar y pagar'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Resumen - Lado derecho */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
              Resumen del pedido
            </h2>

            {/* Productos */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × ${Number(item.price || 0).toLocaleString("es-CL")}
                    </p>
                  </div>
                  <div className="font-medium">
                    ${(Number(item.price || 0) * item.quantity).toLocaleString("es-CL")}
                  </div>
                </div>
              ))}
            </div>

            {/* Totales */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${totalPrice.toLocaleString("es-CL")}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                  {shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString("es-CL")}`}
                </span>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${finalTotal.toLocaleString("es-CL")}
                  </span>
                </div>
                <p className="text-sm text-gray-500 text-right">
                  IVA incluido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;