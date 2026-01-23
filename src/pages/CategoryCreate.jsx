import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Modal from "@/components/reuse/Modal";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { capitalizeFirst } from "@lib/helpers"

import {
  fetchAllCategories,
  saveCategory,
  editCategory,
  deleteCategory,
} from "@/services/category.service";

const CategoryCreate = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "", // ← nueva propiedad para imagen
  });

  /* =========================
     CARGA INICIAL
  ========================= */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data);
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
    if (!formData.name.trim()) return "El nombre es obligatorio";
    if (!formData.image) return "Se requiere una imagen para la categoría";
    return null;
  };

  /* =========================
     CREAR
  ========================= */
  const handleCreateCategory = async () => {
    const error = validateCategory();
    if (error) return toast.error(error);

    const payload = {
      name: capitalizeFirst(formData.name),
      description: formData.description?.trim() ?? "",
      image: formData.image,
    };

    try {
      const created = await saveCategory(payload);
      setCategories((prev) => [created, ...prev]);
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
    if (error) return toast.error(error);

    const payload = {
      name: capitalizeFirst(formData.name),
      description: formData.description?.trim() ?? "",
      image: formData.image,
    };

    try {
      const updated = await editCategory(editingCategory.id, payload);
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? { ...c, ...updated } : c))
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
      setCategories((prev) => prev.filter((c) => c.id !== idCategory));
      toast.success("Categoría eliminada");
    } catch (err) {
      if (err.message?.includes("violates foreign key constraint")) {
        toast.error(
          "No se puede eliminar la categoría: primero elimina o reasigna los productos asociados."
        );
      } else {
        toast.error(err.message || "Error al eliminar categoría");
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image: "" });
    setEditingCategory(null);
    setShowForm(false);
  };

  /* =========================
     RENDER
  ========================= */
  const term = searchTerm.toLowerCase();
  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(term) ||
      (c.description ?? "").toLowerCase().includes(term)
  );

  // función para actualizar la imagen al subir
  const handleAddImage = (file) => {
    setFormData(prev => ({ ...prev, image: file.cdnUrl }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">📂 Gestión de Categorías</h1>
        <p className="text-gray-600 mb-6">Administra las categorías de tus productos</p>

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
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.description || "Sin descripción"}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingCategory(category);
                    setShowForm(true);
                    setFormData({
                      name: category.name,
                      description: category.description ?? "",
                      image: category.image ?? "",
                    });
                  }}
                  className="text-indigo-600 flex items-center"
                >
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </button>

                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-600 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Eliminar
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
        title={editingCategory ? "Editar categoría" : "Nueva categoría"}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            placeholder="Descripción (opcional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Contenedor flex para botón y preview */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Botón de subida */}
            <div className="flex-shrink-0 w-[7.5rem]">
              <FileUploaderRegular
                pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
                multiple={false} // solo una imagen por categoría
                imgOnly
                onFileUploadSuccess={(file) =>
                  setFormData((prev) => ({ ...prev, image: file.cdnUrl }))
                }
                className="bg-[#4a7c9b] hover:bg-[#5f95b3] text-[#fff] px-3 py-2 rounded-lg cursor-pointer transition-colors w-full text-center"
              />
              <p className="text-gray-500 text-sm mt-1 text-center">
                {formData.image ? "1 / 1 imagen" : "0 / 1 imagen"}
              </p>
            </div>

            {/* Preview horizontal */}
            <div className="flex gap-2 overflow-x-auto flex-1">
              {formData.image && (
                <div className="relative flex-shrink-0">
                  <img
                    src={formData.image}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>


          <div className="flex justify-end gap-2">
            <button onClick={resetForm} className="px-4 py-2 border rounded-lg">Cancelar</button>
            <button
              onClick={editingCategory ? handleEditCategory : handleCreateCategory}
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