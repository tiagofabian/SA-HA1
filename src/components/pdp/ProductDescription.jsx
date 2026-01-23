import React from 'react';

const ProductDescription = ({ description }) => {
    return (
        <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
                Descripción
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                {description}
            </p>
        </div>
    );
};

export default ProductDescription;