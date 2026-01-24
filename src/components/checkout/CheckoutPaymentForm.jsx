import React from 'react';
import { CreditCard } from 'lucide-react';

const CheckoutPaymentForm = ({ formData, onFormDataChange }) => {
    const handlePaymentMethodChange = (method) => {
        onFormDataChange({
            payment: {
                ...formData.payment,
                method: method
            }
        });
    };

    const handlePaymentFieldChange = (field, value) => {
        onFormDataChange({
            payment: {
                ...formData.payment,
                [field]: value
            }
        });
    };

    return (
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
                            type="button"
                            onClick={() => handlePaymentMethodChange(method.split(' ')[1])}
                            className={`p-4 border-2 rounded-xl transition-all text-center ${formData.payment.method === method.split(' ')[1]
                                    ? 'border-gray-900 bg-gray-50'
                                    : 'border-gray-200 hover:border-gray-900'
                                }`}
                        >
                            <div className="text-2xl mb-2">{method.split(' ')[0]}</div>
                            <div className="text-sm font-medium">{method.split(' ')[1]}</div>
                        </button>
                    ))}
                </div>

                {formData.payment.method === "Tarjeta" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre en la tarjeta *
                            </label>
                            <input
                                type="text"
                                value={formData.payment.cardName}
                                onChange={(e) => handlePaymentFieldChange('cardName', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="JUAN P PEREZ"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Número de tarjeta *
                            </label>
                            <input
                                type="text"
                                value={formData.payment.cardNumber}
                                onChange={(e) => handlePaymentFieldChange('cardNumber', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="1234 5678 9012 3456"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fecha de expiración *
                                </label>
                                <input
                                    type="text"
                                    value={formData.payment.expiry}
                                    onChange={(e) => handlePaymentFieldChange('expiry', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    placeholder="MM/AA"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    CVV *
                                </label>
                                <input
                                    type="text"
                                    value={formData.payment.cvv}
                                    onChange={(e) => handlePaymentFieldChange('cvv', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    placeholder="123"
                                    required
                                />
                            </div>
                        </div>
                    </>
                )}

                {formData.payment.method === "Transferencia" && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-blue-800">
                            Para completar tu pedido con transferencia bancaria, realiza el pago a:
                        </p>
                        <div className="mt-2 space-y-1">
                            <p><strong>Banco:</strong> Banco Estado</p>
                            <p><strong>Cuenta:</strong> 1234567890</p>
                            <p><strong>Titular:</strong> Hoseki Joyas S.A.</p>
                            <p><strong>RUT:</strong> 76.123.456-7</p>
                            <p><strong>Email para comprobante:</strong> pagos@hoseki.com</p>
                        </div>
                    </div>
                )}

                {formData.payment.method === "Efectivo" && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <p className="text-yellow-800">
                            Pago en efectivo al momento de la entrega. El repartidor aceptará únicamente el monto exacto.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPaymentForm;