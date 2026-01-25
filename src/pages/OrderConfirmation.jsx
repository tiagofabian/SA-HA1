import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Home, ShoppingBag, Calendar, MapPin, CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    // Obtener datos del pedido del estado de navegación o calcularlos
    useEffect(() => {
        // Simulamos una pequeña carga
        setTimeout(() => {
            try {
                // Intentar obtener datos del checkout
                const orderData = location.state?.orderData;

                if (orderData && orderData.items) {
                    // Usar datos pasados desde Checkout
                    setOrderDetails({
                        ...orderData,
                        orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                        date: new Date().toLocaleDateString('es-CL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
                        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                            .toLocaleDateString('es-CL', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }),
                        customerName: user?.name || "Cliente",
                        customerEmail: user?.email || "",
                        shippingAddress: orderData.shippingAddress || {
                            name: user?.name || "Cliente",
                            street: "Calle Principal 123",
                            city: "Santiago",
                            region: "Metropolitana",
                            zipCode: "1234567"
                        },
                        paymentMethod: orderData.paymentMethod || "Tarjeta de crédito"
                    });
                } else {
                    // Si no hay datos del checkout, mostrar datos básicos
                    setOrderDetails({
                        orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                        date: new Date().toLocaleDateString('es-CL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
                        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                            .toLocaleDateString('es-CL', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }),
                        customerName: user?.name || "Cliente",
                        customerEmail: user?.email || "",
                        shippingAddress: {
                            name: user?.name || "Cliente",
                            street: "Calle Principal 123",
                            city: "Santiago",
                            region: "Metropolitana",
                            zipCode: "1234567"
                        },
                        paymentMethod: "Tarjeta de crédito",
                        items: [],
                        subtotal: 0,
                        shipping: 0,
                        total: 0,
                        message: "No se encontraron detalles del pedido. Esto puede ser una vista de ejemplo."
                    });
                }
            } catch (error) {
                console.error("Error procesando datos del pedido:", error);
                setOrderDetails({
                    orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                    date: new Date().toLocaleDateString('es-CL'),
                    error: true,
                    message: "Hubo un error al cargar los detalles del pedido."
                });
            } finally {
                setLoading(false);
            }
        }, 1000);
    }, [location.state, user]);

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

    if (!orderDetails) {
        return (
            <div className="max-w-4xl mx-auto my-16 px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-white rounded-2xl shadow-lg p-12">
                    <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                        <Package className="h-12 w-12 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        No se encontró el pedido
                    </h2>
                    <p className="text-gray-600 mb-8">
                        {orderDetails?.message || "No hay información disponible para este pedido."}
                    </p>
                    <Link to="/catalogo">
                        <Button className="px-8 py-3 text-lg">
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            Ir al catálogo
                        </Button>
                    </Link>
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
                        Gracias por tu compra, <span className="font-semibold">{orderDetails.customerName}</span>.
                    </p>
                    <p className="text-gray-500 mb-4">
                        Hemos enviado los detalles a: {orderDetails.customerEmail || user?.email}
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
                            <p className="text-xs text-gray-500 mt-1">~{orderDetails.estimatedDelivery}</p>
                        </div>
                    </div>
                </div>

                {/* Detalles del pedido en grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    {/* Información del cliente */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                            <MapPin className="mr-2 h-5 w-5" />
                            Información de envío
                        </h3>
                        <div className="space-y-2">
                            <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                            <p className="text-gray-600">{orderDetails.shippingAddress.street}</p>
                            <p className="text-gray-600">
                                {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.region}
                            </p>
                            <p className="text-gray-600">Código postal: {orderDetails.shippingAddress.zipCode}</p>
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

                    {/* Información de pago y fecha */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Información del pedido
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                <div>
                                    <p className="text-sm text-gray-600">Fecha del pedido</p>
                                    <p className="font-medium">{orderDetails.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                                <div>
                                    <p className="text-sm text-gray-600">Método de pago</p>
                                    <p className="font-medium">{orderDetails.paymentMethod}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">Número de pedido</p>
                                <p className="font-medium font-mono">#{orderDetails.orderId}</p>
                            </div>

                            <div className="pt-3 mt-3 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total pagado:</span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${orderDetails.total?.toLocaleString("es-CL") || "0"}
                                    </span>
                                </div>
                                {orderDetails.subtotal > 0 && (
                                    <p className="text-sm text-gray-500 text-right">
                                        Envío: {orderDetails.shipping === 0 ? 'Gratis' : `$${orderDetails.shipping?.toLocaleString("es-CL")}`}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumen de productos */}
                {orderDetails.items && orderDetails.items.length > 0 && (
                    <div className="mb-10">
                        <h3 className="font-bold text-lg text-gray-900 mb-6">
                            Resumen de productos ({orderDetails.items.length})
                        </h3>
                        <div className="space-y-4">
                            {orderDetails.items.map((item, index) => (
                                <div key={item.id || index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mr-4">
                                        <img
                                            src={item.imageSrc || item.imageUrls?.[0] || "/placeholder.png"}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                                        <p className="text-sm text-gray-500">
                                            Cantidad: {item.quantity} × ${(item.price || 0).toLocaleString("es-CL")}
                                        </p>
                                        {item.description && (
                                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="font-bold text-lg">
                                        ${((item.price || 0) * (item.quantity || 1)).toLocaleString("es-CL")}
                                    </div>
                                </div>
                            ))}

                            {/* Totales */}
                            {orderDetails.subtotal > 0 && (
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span>${orderDetails.subtotal?.toLocaleString("es-CL")}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Envío</span>
                                        <span className={orderDetails.shipping === 0 ? 'text-green-600' : ''}>
                                            {orderDetails.shipping === 0 ? 'Gratis' : `$${orderDetails.shipping?.toLocaleString("es-CL")}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-xl font-bold text-gray-900">
                                            ${orderDetails.total?.toLocaleString("es-CL")}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

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
                        <h4 className="font-bold text-blue-900 mb-2">
                            📧 ¿Qué sigue?
                        </h4>
                        <p className="text-blue-800 text-sm">
                            Te hemos enviado un correo electrónico con todos los detalles de tu pedido
                            y el número de seguimiento. Puedes rastrear tu pedido en cualquier momento
                            usando el número <span className="font-mono font-bold">#{orderDetails.orderId}</span>.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-4">
                            <div className="text-2xl mb-2">📦</div>
                            <p className="text-sm font-medium text-gray-900">Envío rápido</p>
                            <p className="text-xs text-gray-600">Entrega en 3-5 días hábiles</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-2xl mb-2">🔄</div>
                            <p className="text-sm font-medium text-gray-900">Devolución fácil</p>
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