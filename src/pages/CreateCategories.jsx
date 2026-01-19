import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Modal from '@/components/reuse/Modal';

const STORAGE_KEY = 'categories';

const CreateCategories = () => {
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCategorias(JSON.parse(stored));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  }, []);

  // Generar ID incremental
  const generateCategoryId = () => {
    return categorias.length
      ? Math.max(...categorias.map(c => c.id)) + 1
      : 1;
  };

  // Validaciones
  const validateCategory = (category) => {
    if (!category.nombre?.trim()) return 'El nombre es obligatorio';
    return null;
  };

  // Crear
  const handleCreateCategory = () => {
    const error = validateCategory(formData);
    if (error) {
      toast.error(error);
      return;
    }

    const nuevaCategoria = {
      id: generateCategoryId(),
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
    };

    const updated = [nuevaCategoria, ...categorias];
    setCategorias(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    toast.success('Categoría creada correctamente');
    resetForm();
  };

  // Editar
  const handleEditCategory = () => {
    const error = validateCategory(formData);
    if (error) {
      toast.error(error);
      return;
    }

    const updated = categorias.map(c =>
      c.id === editingCategory.id
        ? { ...c, ...formData }
        : c
    );

    setCategorias(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    toast.success('Categoría actualizada');
    resetForm();
  };

  // Eliminar
  const handleDeleteCategory = (id) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;

    const updated = categorias.filter(c => c.id !== id);
    setCategorias(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    toast.success('Categoría eliminada');
  };

  const resetForm = () => {
    setFormData({ nombre: '', descripcion: '' });
    setShowForm(false);
    setEditingCategory(null);
  };

  const term = searchTerm.toLowerCase();

  const filteredCategories = categorias.filter(c =>
    c.nombre.toLowerCase().includes(term) ||
    c.descripcion.toLowerCase().includes(term)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">📂 Gestión de Categorías</h1>
        <p className="text-gray-600 mb-6">
          Administra las categorías de tus productos
        </p>

        {/* Controles */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar categoría..."
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
            Nueva Categoría
          </button>
        </div>

        {/* Listado */}
        <div className="grid gap-4">
          {filteredCategories.map(categoria => (
            <div
              key={categoria.id}
              className="bg-white rounded-xl shadow p-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{categoria.nombre}</h3>
                <p className="text-sm text-gray-500">
                  {categoria.descripcion || 'Sin descripción'}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingCategory(categoria);
                    setFormData({
                      nombre: categoria.nombre,
                      descripcion: categoria.descripcion || '',
                    });
                  }}
                  className="text-indigo-600 flex items-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </button>

                <button
                  onClick={() => handleDeleteCategory(categoria.id)}
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
        isOpen={showForm || Boolean(editingCategory)}
        onClose={resetForm}
        title={editingCategory ? 'Editar categoría' : 'Nueva categoría'}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            placeholder="Descripción (opcional)"
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={resetForm}
              className="px-4 py-2 border rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={
                editingCategory
                  ? handleEditCategory
                  : handleCreateCategory
              }
              className="px-4 py-2 bg-[#5e8c77] text-white rounded-lg"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateCategories;