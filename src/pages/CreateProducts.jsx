import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import ProductForm from '@/components/ProductForm';
import { toast } from 'react-toastify';
import initialProducts from '../data/products.json';
import Modal from '@/components/reuse/Modal';
import { CATEGORY_ID_RULES } from '@/lib/helpers';

const STORAGE_KEY = 'products';

const CreateProducts = () => {
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProductos(JSON.parse(stored));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
      setProductos(initialProducts);
    }
  }, []);

  // ID por categoría
  const generateProductId = (categoria, productos) => {
    const baseId = CATEGORY_ID_RULES[categoria.toLowerCase()];
    if (!baseId) throw new Error('Categoría inválida');

    const ids = productos
      .filter(p => p.categoria.toLowerCase() === categoria.toLowerCase())
      .map(p => p.id);

    return ids.length ? Math.max(...ids) + 1 : baseId;
  };

  // Validaciones
  const validateProduct = (product) => {
    if (!product.nombre?.trim()) return 'El nombre es obligatorio';
    if (!product.categoria) return 'La categoría es obligatoria';
    if (!CATEGORY_ID_RULES[product.categoria.toLowerCase()])
      return 'Categoría no válida';
    if (!product.precio || Number(product.precio) <= 0)
      return 'El precio debe ser mayor a 0';

    return null;
  };

  // Crear
  const handleCreateProduct = (productData) => {
    const error = validateProduct(productData);
    if (error) {
      toast.error(error);
      return;
    }

    const nuevoProducto = {
      ...productData,
      id: generateProductId(productData.categoria, productos),
      precio: Number(productData.precio),
      imagen:
        typeof productData.imagen === 'string'
          ? productData.imagen
          : productData.imagen?.name || '',
    };

    const updated = [nuevoProducto, ...productos];
    setProductos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    console.log("ID agregado: ", generateProductId(productData.categoria, productos))

    setShowForm(false);
    setEditingProduct(null);

    toast.success('Producto creado correctamente');
  };

  // Editar
  const handleEditProduct = (productData) => {
    const updated = productos.map(p =>
      p.id === editingProduct.id
        ? {
            ...productData,
            id: p.id,
            imagen:
              typeof productData.imagen === 'string'
                ? productData.imagen
                : productData.imagen?.name || p.imagen,
          }
        : p
    );

    setProductos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEditingProduct(null);

    toast.success('Producto actualizado');
  };

  // Eliminar
  const handleDeleteProduct = (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    const updated = productos.filter(p => p.id !== id);
    setProductos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    toast.success('Producto eliminado');
  };

  // Exportar JSON
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(productos, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const term = searchTerm.toLowerCase();

  const filteredProducts = productos.filter(producto =>
    producto.nombre?.toLowerCase().includes(term) ||
    producto.descripcion?.toLowerCase().includes(term) ||
    producto.categoria?.toLowerCase().includes(term)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🎌 Gestión de Productos</h1>
        <p className="text-gray-600 mb-6">Administra tu catálogo de joyas</p>

        {/* Controles */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-[#5e8c77] text-white rounded-lg flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Joya
          </button>
          <button
            onClick={handleExportJSON}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-100"
          >
            Exportar JSON
          </button>
        </div>

        {/* Listado */}
        <div className="grid gap-4">
          {filteredProducts.map(producto => (
            <div
              key={producto.id}
              className="bg-white rounded-xl shadow p-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{producto.nombre}</h3>
                <p className="text-sm text-gray-500">{producto.categoria}</p>
                <p className="text-sm">{producto.descripcion}</p>
                <p className="font-medium">
                  ${producto.precio.toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditingProduct(producto)}
                  className="text-indigo-600 flex items-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProduct(producto.id)}
                  className="text-red-600 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={showForm || Boolean(editingProduct)}
        onClose={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'Editar producto' : 'Nuevo producto'}
      >
        <ProductForm
          initialData={editingProduct}
          onSubmit={editingProduct ? handleEditProduct : handleCreateProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default CreateProducts;
