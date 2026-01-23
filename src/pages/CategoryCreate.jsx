import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Modal from "@/components/reuse/Modal";
import { capitalizeFirst } from "@lib/helpers"

import {
  fetchAllCategories,
  saveCategory,
  editCategory,
  deleteCategory,
} from "@/services/category.service";

const CategoryCreate = () => {
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  });

  /* =========================
     CARGA INICIAL
  ========================= */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategorias(data);
      } catch (err) {
        toast.error("Error al cargar categorías");
      }
    };

    loadCategories();
  }, []);

  /* =========================
     VALIDACIÓN
  ========================= */
  const validateCategory = () => {
    if (!formData.category_name.trim()) {
      return "El nombre es obligatorio";
    }
    return null;
  };

  /* =========================
     CREAR
  ========================= */
  const handleCreateCategory = async () => {
    const error = validateCategory();
    if (error) {
      toast.error(error);
      return;
    }

    // Normalizar el nombre de la categoría
    const normalizedCategoryName = capitalizeFirst(formData.category_name);

    const payload = {
      ...formData,
      category_name: normalizedCategoryName,
    };

    try {
      const created = await saveCategory(payload);

      // Actualizar estado de categorías
      setCategorias((prev) => [created, ...prev]);

      toast.success("Categoría creada correctamente");
      resetForm();
    } catch (err) {
      toast.error(err.message || "Error al crear categoría");
    }
  };

  /* =========================
     EDITAR
  ========================= */
  const handleEditCategory = async () => {
    const error = validateCategory();
    if (error) {
      toast.error(error);
      return;
    }

    const payload = {
      ...formData,
      category_name: capitalizeFirst(formData.category_name),
    };

    try {
      const updated = await editCategory(editingCategory.id_category, payload);

      setCategorias((prev) =>
        prev.map((c) =>
          c.id_category === editingCategory.id_category ? updated : c
        )
      );

      toast.success("Categoría actualizada");
      resetForm();
    } catch (err) {
      toast.error(err.message || "Error al actualizar categoría");
    }
  };

  /* =========================
     ELIMINAR
  ========================= */
  const handleDeleteCategory = async (idCategory) => {
    if (!window.confirm("¿Eliminar esta categoría?")) return;

    try {
      await deleteCategory(idCategory);

      setCategorias((prev) =>
        prev.filter((c) => c.id_category !== idCategory)
      );

      toast.success("Categoría eliminada");
    } catch (err) {
      toast.error(err.message || "Error al eliminar categoría");
    }
  };

  const resetForm = () => {
    setFormData({ category_name: "", description: "" });
    setEditingCategory(null);
    setShowForm(false);
  };

  /* =========================
     BUSCADOR
  ========================= */
  const term = searchTerm.toLowerCase();

  const filteredCategories = categorias.filter(
    (c) =>
      c.category_name.toLowerCase().includes(term) ||
      (c.description ?? "").toLowerCase().includes(term)
  );

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          📂 Gestión de Categorías
        </h1>
        <p className="text-gray-600 mb-6">
          Administra las categorías de tus productos
        </p>

        {/* CONTROLES */}
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

        {/* LISTADO */}
        <div className="grid gap-4">
          {filteredCategories.map((categoria) => (
            <div
              key={categoria.id_category}
              className="bg-white rounded-xl shadow p-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">
                  {categoria.category_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {categoria.description || "Sin descripción"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingCategory(categoria);
                    setFormData({
                      category_name: categoria.category_name,
                      description: categoria.description ?? "",
                    });
                  }}
                  className="text-indigo-600 flex items-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </button>

                <button
                  onClick={() =>
                    handleDeleteCategory(categoria.id_category)
                  }
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
        title={
          editingCategory ? "Editar categoría" : "Nueva categoría"
        }
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={formData.category_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                category_name: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            placeholder="Descripción (opcional)"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
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

export default CategoryCreate;
