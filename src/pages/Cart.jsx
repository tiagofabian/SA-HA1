import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity } =
    useCart();

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.precio || 0) * item.quantity,
    0
  );


  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Tu carrito está vacío
        </h2>
        <Link to="/catalogo">
          <Button>Ir al catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Carrito de compras</h1>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Productos */}
        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id_product} className="flex gap-4 border rounded-lg p-4 shadow-sm">
              {/* Imagen */}
              <img
                src={item.imageSrc || "/placeholder.png"} // si no hay imagen
                alt={item.product_name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.product_name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${Number(item.precio || 0).toLocaleString("es-CL")}
                </p>

                {/* Cantidad */}
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decreaseQuantity(item.id_product)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center">{item.quantity}</span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Eliminar */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.id_product)}
                aria-label="Eliminar producto"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          ))}

        </div>

        {/* Resumen */}
        <div className="border rounded-lg p-6 h-fit shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Resumen</h2>

          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span className="font-bold">
              ${totalPrice.toLocaleString("es-CL")}
            </span>
          </div>

          <Button
            className="w-full mt-6"
            onClick={() => navigate("/checkout")}
          >
            Finalizar compra
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
