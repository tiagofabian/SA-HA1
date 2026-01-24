import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Home, ShoppingBag } from "lucide-react";

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    // Datos simulados del pedido
    useEffect(() => {
        // Simulamos la carga de datos del pedido
        setTimeout(() => {
            setOrderDetails({
                orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                date: new Date().toLocaleDateString("es-CL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                estimatedDelivery: new Date(
                    Date.now() + 5 * 24 * 60 * 60 * 1000,
                ).toLocaleDateString("es-CL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                shippingAddress: {
                    name: "Juan Pérez",
                    street: "Calle Principal 123",
                    city: "Santiago",
                    region: "Metropolitana",
                    zipCode: "1234567",
                },
                paymentMethod: "Tarjeta de crédito",
                items: [
                    {
                        id: 1,
                        name: "Anillo Dragon Ball",
                        price: 19990,
                        quantity: 1,
                        image: "/api/placeholder/64/64",
                    },
                    {
                        id: 2,
                        name: "Collar Sailor Moon",
                        price: 24990,
                        quantity: 2,
                        image: "/api/placeholder/64/64",
                    },
                ],
                subtotal: 69970,
                shipping: 0,
                total: 69970,
            });
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto my-16 px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-white rounded-2xl shadow-lg p-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-6"></div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Preparando tu confirmación
                    </h2>
                    <p className="text-gray-600">
                        Estamos procesando los detalles de tu pedido...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto my-8 md:my-16 px-4 sm:px-6 lg:px-8">
            {/* Tarjeta principal de confirmación */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
                {/* Encabezado con éxito */}
                <div className="text-center mb-10">
                    <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        ¡Pedido Confirmado!
                    </h1>
                    <p className="text-gray-600 text-lg mb-2">
                        Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
                        <span className="font-mono font-bold text-gray-900">
                            #{orderDetails.orderId}
                        </span>
                    </div>
                </div>

                {/* Progreso del pedido */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Truck className="mr-2 h-5 w-5" />
                        Seguimiento de tu pedido
                    </h2>

                    <div className="flex items-center justify-between max-w-3xl mx-auto mb-8">
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-3">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-medium text-sm">Confirmado</span>
                            <p className="text-xs text-gray-500 mt-1">Hoy</p>
                        </div>

                        <div className="flex-1 h-1 bg-gray-300"></div>

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <span className="font-medium text-sm">Preparando</span>
                            <p className="text-xs text-gray-500 mt-1">Próximos días</p>
                        </div>

                        <div className="flex-1 h-1 bg-gray-300"></div>

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                <Truck className="h-6 w-6 text-gray-400" />
                            </div>
                            <span className="font-medium text-sm">En camino</span>
                            <p className="text-xs text-gray-500 mt-1">
                                ~{orderDetails.estimatedDelivery}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Detalles del pedido en grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    {/* Información de envío */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                            <Truck className="mr-2 h-5 w-5" />
                            Información de envío
                        </h3>
                        <div className="space-y-2">
                            <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                            <p className="text-gray-600">
                                {orderDetails.shippingAddress.street}
                            </p>
                            <p className="text-gray-600">
                                {orderDetails.shippingAddress.city},{" "}
                                {orderDetails.shippingAddress.region}
                            </p>
                            <p className="text-gray-600">
                                Código postal: {orderDetails.shippingAddress.zipCode}
                            </p>
                            <div className="pt-3 mt-3 border-t border-gray-200">
                                <p className="text-sm font-medium text-gray-900">
                                    Fecha estimada de entrega:
                                </p>
                                <p className="text-lg font-bold text-blue-600">
                                    {orderDetails.estimatedDelivery}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Información de pago */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">
                            Información de pago
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Método de pago:</span>
                                <span className="font-medium">
                                    {orderDetails.paymentMethod}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Fecha del pedido:</span>
                                <span className="font-medium">{orderDetails.date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Número de pedido:</span>
                                <span className="font-medium font-mono">
                                    #{orderDetails.orderId}
                                </span>
                            </div>
                            <div className="pt-3 mt-3 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">
                                        Total pagado:
                                    </span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${orderDetails.total.toLocaleString("es-CL")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumen de productos */}
                <div className="mb-10">
                    <h3 className="font-bold text-lg text-gray-900 mb-6">
                        Resumen de productos
                    </h3>
                    <div className="space-y-4">
                        {orderDetails.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center p-4 border border-gray-200 rounded-lg"
                            >
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                                    <Package className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                                    <p className="text-sm text-gray-500">
                                        Cantidad: {item.quantity} × $
                                        {item.price.toLocaleString("es-CL")}
                                    </p>
                                </div>
                                <div className="font-bold text-lg">
                                    ${(item.price * item.quantity).toLocaleString("es-CL")}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/catalogo" className="sm:flex-1">
                        <Button className="w-full py-3 text-lg" variant="outline">
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            Seguir comprando
                        </Button>
                    </Link>

                    <Link to="/" className="sm:flex-1">
                        <Button className="w-full py-3 text-lg bg-gray-900 text-white hover:bg-gray-800">
                            <Home className="mr-2 h-5 w-5" />
                            Volver al inicio
                        </Button>
                    </Link>
                </div>

                {/* Información adicional */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-blue-900 mb-2">📧 ¿Qué sigue?</h4>
                        <p className="text-blue-800 text-sm">
                            Te hemos enviado un correo electrónico con todos los detalles de
                            tu pedido y el número de seguimiento. Puedes rastrear tu pedido en
                            cualquier momento desde la sección "Mis Pedidos" de tu cuenta.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-4">
                            <div className="text-2xl mb-2">📦</div>
                            <p className="text-sm font-medium text-gray-900">Envío rápido</p>
                            <p className="text-xs text-gray-600">
                                Entrega en 3-5 días hábiles
                            </p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-2xl mb-2">🔄</div>
                            <p className="text-sm font-medium text-gray-900">
                                Devolución fácil
                            </p>
                            <p className="text-xs text-gray-600">30 días para devoluciones</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-2xl mb-2">📞</div>
                            <p className="text-sm font-medium text-gray-900">Soporte 24/7</p>
                            <p className="text-xs text-gray-600">Ayuda cuando la necesites</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
