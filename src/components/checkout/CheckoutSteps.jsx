import React from 'react';

const CheckoutSteps = ({ step }) => {
    const steps = [
        { number: 1, label: 'Dirección' },
        { number: 2, label: 'Pago' },
        { number: 3, label: 'Resumen' }
    ];

    return (
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Finalizar compra
            </h1>

            <div className="flex items-center justify-between max-w-2xl">
                {steps.map((stepItem, index) => (
                    <React.Fragment key={stepItem.number}>
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepItem.number ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {stepItem.number}
                            </div>
                            <span className={`ml-2 font-medium ${step >= stepItem.number ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                {stepItem.label}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="flex-1 h-1 mx-4 bg-gray-200"></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default CheckoutSteps;