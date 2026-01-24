import React from 'react';

const CheckoutSidebar = ({ cart, totalPrice, shippingCost, finalTotal }) => {
    return (
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
    );
};

export default CheckoutSidebar;