import React from 'react';
import { CheckCircle, Package } from 'lucide-react';

const CheckoutSummaryStep = ({ cart, formData, finalTotal, shippingCost }) => {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Revisa tu pedido
            </h2>

            <div className="space-y-6">
                {/* Resumen de dirección */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">Dirección de envío</h3>
                    <p className="text-gray-700">{formData.shippingAddress.name}</p>
                    <p className="text-gray-700">{formData.shippingAddress.street}</p>
                    <p className="text-gray-700">{formData.shippingAddress.city}, {formData.shippingAddress.region} ({formData.shippingAddress.zipCode})</p>
                    <p className="text-gray-700">Teléfono: {formData.shippingAddress.phone}</p>
                    {formData.shippingAddress.instructions && (
                        <p className="text-gray-700 mt-2">
                            <span className="font-medium">Instrucciones:</span> {formData.shippingAddress.instructions}
                        </p>
                    )}
                </div>

                {/* Resumen de pago */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">Método de pago</h3>
                    <p className="text-gray-700">
                        {formData.payment.method === "Tarjeta" ? "Tarjeta de crédito/débito" : formData.payment.method}
                    </p>
                    {formData.payment.method === "Tarjeta" && formData.payment.cardNumber && (
                        <p className="text-gray-700 text-sm mt-1">
                            Terminada en •••• {formData.payment.cardNumber.slice(-4)}
                        </p>
                    )}
                </div>

                {/* Resumen de productos */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-4">Resumen de productos</h3>
                    <div className="space-y-3">
                        {cart.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                                <div className="w-12 h-12 flex-shrink-0">
                                    <img
                                        src={item.imageSrc}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                                    <p className="text-gray-500 text-xs">
                                        {item.quantity} × ${Number(item.price || 0).toLocaleString("es-CL")}
                                    </p>
                                </div>
                                <div className="font-medium">
                                    ${(Number(item.price || 0) * item.quantity).toLocaleString("es-CL")}
                                </div>
                            </div>
                        ))}
                        {cart.length > 3 && (
                            <p className="text-gray-500 text-sm text-center">
                                <Package className="inline mr-1 h-4 w-4" />
                                +{cart.length - 3} productos más
                            </p>
                        )}
                    </div>
                </div>

                {/* Total */}
                <div className="bg-gray-900 text-white p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total a pagar</span>
                        <span className="text-2xl font-bold">
                            ${finalTotal.toLocaleString("es-CL")}
                        </span>
                    </div>
                    <p className="text-gray-300 text-sm mt-1 text-right">
                        IVA incluido • Envío: {shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString("es-CL")}`}
                    </p>
                </div>

                {/* Nota */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-800 text-sm">
                        ✅ Al confirmar, tu pedido será procesado y recibirás un correo con los detalles.
                        Puedes cancelar o modificar tu pedido dentro de las próximas 2 horas.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSummaryStep;