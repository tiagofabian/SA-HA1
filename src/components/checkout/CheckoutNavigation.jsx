import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const CheckoutNavigation = ({ step, onStepChange, loading, onConfirmOrder }) => {
    const handleBack = () => {
        if (step > 1) {
            onStepChange(step - 1);
        }
    };

    const handleNext = () => {
        if (step < 3) {
            onStepChange(step + 1);
        }
    };

    return (
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {step === 3 ? 'Volver a pago' : 'Volver a dirección'}
                </Button>
            ) : (
                <Link to="/cart">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al carrito
                    </Button>
                </Link>
            )}

            {step < 3 ? (
                <Button
                    onClick={handleNext}
                    className="bg-gray-900 text-white hover:bg-gray-800"
                >
                    {step === 1 ? 'Continuar al pago' : 'Ver resumen'}
                </Button>
            ) : (
                <Button
                    onClick={onConfirmOrder}
                    disabled={loading}
                    className="bg-gray-900 text-white hover:bg-gray-800"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Procesando pago...
                        </>
                    ) : (
                        'Confirmar y pagar'
                    )}
                </Button>
            )}
        </div>
    );
};

export default CheckoutNavigation;