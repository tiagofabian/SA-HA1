import React from 'react';

const ProductHeader = ({ name, price, stock }) => {
    return (
        <div className="mb-1">
            {/* Contenedor unificado con fondo */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200 mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Nombre a la izquierda */}
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                            {name}
                        </h1>
                    </div>

                    {/* Precio a la derecha */}
                    <div className="flex-shrink-0">
                        <p className="text-3xl md:text-4xl font-bold text-gray-900">
                            ${price.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Línea divisoria sutil (opcional, puedes quitarla si prefieres) */}
            {/* <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div> */}
        </div>
    );
};

export default ProductHeader;