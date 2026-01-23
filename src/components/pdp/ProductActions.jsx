import React from 'react';

const ProductActions = ({ product, quantityInCart, onAddToCart, onDecreaseQuantity }) => {
    const { stock, price } = product;

    return (
        <div className="mt-6 pt-6 border-t">
            {quantityInCart > 0 ? (
                <div className="space-y-4">
                    <div className="flex flex-col items-center space-y-3">
                        <p className="text-sm text-gray-600">Cantidad en carrito</p>

                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => onDecreaseQuantity(product.id)}
                                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-all duration-200 hover:shadow-md"
                                aria-label="Disminuir cantidad"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                </svg>
                            </button>

                            <div className="min-w-[60px] text-center">
                                <p className="text-2xl font-bold text-gray-900">{quantityInCart}</p>
                            </div>

                            <button
                                onClick={() => onAddToCart(product)}
                                disabled={quantityInCart >= stock}
                                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${quantityInCart >= stock
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md'
                                    }`}
                                aria-label="Aumentar cantidad"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Total */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                Subtotal: <span className="font-bold text-lg text-gray-900">
                                    ${(price * quantityInCart).toLocaleString()}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Botón para seguir comprando */}
                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={quantityInCart >= stock}
                        className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-300 ${quantityInCart >= stock
                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-900 text-white hover:bg-black hover:shadow-md'
                            }`}
                    >
                        {quantityInCart >= stock ? 'Stock máximo alcanzado' : 'Agregar una unidad más'}
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={stock === 0}
                        className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 ${stock === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-gray-900 to-black text-white hover:from-gray-800 hover:to-gray-900 hover:shadow-lg'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        {stock === 0 ? 'PRODUCTO AGOTADO' : 'AGREGAR AL CARRITO'}
                    </button>

                    {stock > 0 && (
                        <div className="text-center">
                            <div className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                Pago seguro • Envío rápido • Garantía
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Información adicional */}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                    <div className="flex flex-col items-center text-center p-2 rounded-lg bg-gray-50">
                        <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                        </svg>
                        <span className="font-medium">Envío gratis</span>
                        <span className="text-[10px]">Sobre $50.000</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 rounded-lg bg-gray-50">
                        <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        <span className="font-medium">Devolución</span>
                        <span className="text-[10px]">30 días</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 rounded-lg bg-gray-50">
                        <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="font-medium">Garantía</span>
                        <span className="text-[10px]">1 año</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductActions;