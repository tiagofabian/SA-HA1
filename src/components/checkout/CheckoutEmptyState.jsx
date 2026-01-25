import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const CheckoutEmptyState = () => {
    return (
        <div className="max-w-6xl mx-auto my-16 px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    No hay productos en el carrito
                </h2>
                <p className="text-gray-600 mb-8">
                    Agrega productos al carrito para proceder con el pago.
                </p>
                <Link to="/cateroria">
                    <Button className="px-8 py-3 text-lg">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Volver a la categoría
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default CheckoutEmptyState;