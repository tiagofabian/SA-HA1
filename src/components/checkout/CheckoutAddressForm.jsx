import React from 'react';
import { MapPin } from 'lucide-react';

const CheckoutAddressForm = ({ formData, onFormDataChange }) => {
    const handleChange = (field, value) => {
        onFormDataChange({
            shippingAddress: {
                ...formData.shippingAddress,
                [field]: value
            }
        });
    };

    return (
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
                            value={formData.shippingAddress.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="Juan Pérez"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono *
                        </label>
                        <input
                            type="tel"
                            value={formData.shippingAddress.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="+56 9 1234 5678"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección *
                    </label>
                    <input
                        type="text"
                        value={formData.shippingAddress.street}
                        onChange={(e) => handleChange('street', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Calle Principal 123"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ciudad *
                        </label>
                        <input
                            type="text"
                            value={formData.shippingAddress.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="Santiago"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Región *
                        </label>
                        <input
                            type="text"
                            value={formData.shippingAddress.region}
                            onChange={(e) => handleChange('region', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="Metropolitana"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Código postal *
                        </label>
                        <input
                            type="text"
                            value={formData.shippingAddress.zipCode}
                            onChange={(e) => handleChange('zipCode', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="1234567"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instrucciones de entrega (opcional)
                    </label>
                    <textarea
                        value={formData.shippingAddress.instructions}
                        onChange={(e) => handleChange('instructions', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        rows="3"
                        placeholder="Ej: Llamar antes de llegar, dejar con conserjería, etc."
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default CheckoutAddressForm;