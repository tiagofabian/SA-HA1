import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

// Componentes de checkout
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import CheckoutAddressForm from "@/components/checkout/CheckoutAddressForm";
import CheckoutPaymentForm from "@/components/checkout/CheckoutPaymentForm";
import CheckoutSummaryStep from "@/components/checkout/CheckoutSummaryStep";
import CheckoutSidebar from "@/components/checkout/CheckoutSidebar";
import CheckoutNavigation from "@/components/checkout/CheckoutNavigation";
import CheckoutEmptyState from "@/components/checkout/CheckoutEmptyState";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shippingAddress: {
      name: user?.name || "",
      phone: "",
      street: "",
      city: "",
      region: "",
      zipCode: "",
      instructions: ""
    },
    payment: {
      method: "Tarjeta",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: ""
    }
  });

  // Cálculos
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price || 0) * item.quantity,
    0
  );
  const shippingCost = totalPrice > 50000 ? 0 : 5000;
  const finalTotal = totalPrice + shippingCost;

  // Estado carrito vacío
  if (cart.length === 0) {
    return <CheckoutEmptyState />;
  }

  // Handlers
  const handleFormDataChange = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmitOrder = () => {
    // Validaciones
    if (step === 1) {
      const { name, phone, street, city, region, zipCode } = formData.shippingAddress;
      if (!name || !phone || !street || !city || !region || !zipCode) {
        alert("Por favor completa todos los campos obligatorios de dirección");
        return;
      }
    }
    
    if (step === 2 && formData.payment.method === "Tarjeta") {
      const { cardName, cardNumber, expiry, cvv } = formData.payment;
      if (!cardName || !cardNumber || !expiry || !cvv) {
        alert("Por favor completa todos los campos de la tarjeta");
        return;
      }
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      const orderData = {
        items: cart,
        subtotal: totalPrice,
        shipping: shippingCost,
        total: finalTotal,
        shippingAddress: {
          ...formData.shippingAddress,
          name: formData.shippingAddress.name || user?.name || "Cliente"
        },
        paymentMethod: formData.payment.method,
        customerName: user?.name || formData.shippingAddress.name,
        customerEmail: user?.email || "",
        date: new Date().toLocaleDateString('es-CL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      
      clearCart();
      
      navigate("/order-confirmation", { 
        state: { 
          orderData: orderData
        }
      });
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto my-8 md:my-16 px-4 sm:px-6 lg:px-8">
      {/* Pasos */}
      <CheckoutSteps step={step} />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Formulario principal */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {step === 1 && (
              <CheckoutAddressForm 
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            )}

            {step === 2 && (
              <CheckoutPaymentForm 
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            )}

            {step === 3 && (
              <CheckoutSummaryStep 
                cart={cart}
                formData={formData}
                finalTotal={finalTotal}
                shippingCost={shippingCost}
              />
            )}

            {/* Navegación */}
            <CheckoutNavigation 
              step={step}
              onStepChange={setStep}
              loading={loading}
              onConfirmOrder={handleSubmitOrder}
            />
          </div>
        </div>

        {/* Sidebar (solo en pasos 1 y 2) */}
        {step < 3 && (
          <div className="lg:w-1/3">
            <CheckoutSidebar 
              cart={cart}
              totalPrice={totalPrice}
              shippingCost={shippingCost}
              finalTotal={finalTotal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;