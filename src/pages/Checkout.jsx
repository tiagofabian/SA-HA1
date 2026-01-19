import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { Button } from "../components/ui/button";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  const handlePayment = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    clearCart();
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <div className="container mx-auto px-6 py-20 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">
          Pasarela de pago
        </h1>

        <div className="border rounded-lg p-6 shadow-sm bg-white space-y-4">
          <p className="text-sm text-muted-foreground">
            Estás a punto de realizar un pago simulado.
          </p>

          <div className="flex justify-between text-lg font-medium">
            <span>Total a pagar</span>
            <span>
              ${total.toLocaleString("es-CL")}
            </span>
          </div>

          <Button className="w-full mt-4" onClick={handlePayment}>
            Confirmar pago
          </Button>
        </div>
      </div>

      {/* 🟢 MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-3">
              Pago realizado
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              ✅ Tu pago fue procesado correctamente.
              <br />
              Gracias por tu compra.
            </p>

            <Button className="w-full" onClick={handleConfirm}>
              Aceptar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
