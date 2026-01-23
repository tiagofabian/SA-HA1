import React from 'react';

const ProductMetadata = ({ category, collections, stock }) => {
    const stockPercentage = Math.min(100, (stock / (stock > 20 ? stock : 20)) * 100);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Categoría */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-1">
                        <span className="text-xs font-medium text-gray-500">Categoría</span>
                    </div>
                    <p className="text-gray-900 font-medium text-sm">{category?.name ?? "Sin categoría"}</p>
                </div>

                {/* Colecciones */}
                {collections && collections.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-1">
                            <span className="text-xs font-medium text-gray-500">Colecciones</span>
                        </div>
                        <p className="text-gray-900 font-medium text-sm">
                            {collections.map(c => c.name).join(", ")}
                        </p>
                    </div>
                )}
            </div>

            {/* Stock */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div>
                            <p className="text-xs font-medium text-blue-800">Stock disponible</p>
                            <p className="text-base font-bold text-blue-900">{stock} unidades</p>
                        </div>
                    </div>
                    <div className="w-20">
                        <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${stockPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductMetadata;