import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Modal from "@/components/reuse/Modal";
import { capitalizeFirst } from "@lib/helpers";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

import {
  fetchAllCollections,
  saveCollection,
  editCollection,
  deleteCollection,
} from "@/services/collection.service";

const ManageCollection = () => {
  const [colecciones, setColecciones] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "", // nuevo campo para la imagen
  });

  /* =========================
     CARGA INICIAL
  ========================= */
  useEffect(() => {
    const loadCollections = async () => {
      try {
        const data = await fetchAllCollections();
        setColecciones(data);
      } catch (err) {
        toast.error("Error al cargar coleccións");
      }
    };
    loadCollections();
  }, []);

  /* =========================
     VALIDACIÓN
  ========================= */
  const validateCollection = () => {
    if (!formData.name.trim()) return "El nombre es obligatorio";
    return null;
  };

  /* =========================
     AGREGAR IMAGEN
  ========================= */
  const handleAddImage = (file) => {
    setFormData((prev) => ({ ...prev, image: file.cdnUrl }));
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  /* =========================
     CREAR
  ========================= */
  const handleCreateCollection = async () => {
    const error = validateCollection();
    if (error) return toast.error(error);

    const payload = {
      ...formData,
      name: capitalizeFirst(formData.name),
      description: formData.description?.trim() ?? "",
      image: formData.image ?? "",
    };

    try {
      const created = await saveCollection(payload);
      setColecciones((prev) => [created, ...prev]);
      toast.success("Colección creada correctamente");
      resetForm();
    } catch (err) {
      toast.error(err.message || "Error al crear colección");
    }
  };

  /* =========================
     EDITAR
  ========================= */
  const handleEditCollection = async () => {
    const error = validateCollection();
    if (error) return toast.error(error);

    const payload = {
      ...formData,
      name: capitalizeFirst(formData.name),
      description: formData.description?.trim() ?? "",
      image: formData.image ?? "",
    };

    try {
      const updated = await editCollection(editingCollection.id, payload);
      setColecciones((prev) =>
        prev.map((c) => (c.id === editingCollection.id ? { ...c, ...updated } : c))
      );
      toast.success("Colección actualizada");
      resetForm();
    } catch (err) {
      toast.error(err.message || "Error al actualizar colección");
    }
  };

  /* =========================
     ELIMINAR
  ========================= */
  const handleDeleteCollection = async (idCollection) => {
    if (!window.confirm("¿Eliminar esta colección?")) return;

    try {
      await deleteCollection(idCollection);
      setColecciones((prev) => prev.filter((c) => c.id !== idCollection));
      toast.success("Colección eliminada");
    } catch (err) {
      toast.error(err.message || "Error al eliminar colección");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image: "" });
    setEditingCollection(null);
    setShowForm(false);
  };

  /* =========================
     BUSCADOR
  ========================= */
  const term = searchTerm.toLowerCase();
  const filteredCollections = colecciones.filter(
    (c) =>
      c.name.toLowerCase().includes(term) ||
      (c.description ?? "").toLowerCase().includes(term)
  );

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen bg-gray-50 lg:px-16 px-8 py-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">📂 Gestión de Colecciones</h1>
        <p className="text-gray-600 mb-6">Administra las colecciones de tus productos</p>

        {/* CONTROLES */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar colección..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-[#5e8c77] text-white rounded-lg flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Nueva Colección
          </button>
        </div>

        {/* LISTADO */}
        <div className="grid gap-4">
          {filteredCollections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white rounded-xl shadow p-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{collection.name}</h3>
                <p className="text-sm text-gray-500">
                  {collection.description || "Sin descripción"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingCollection(collection);
                    setFormData({
                      name: collection.name,
                      description: collection.description ?? "",
                      image: collection.image ?? "",
                    });
                    setShowForm(true);
                  }}
                  className="text-indigo-600 flex items-center"
                >
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </button>

                <button
                  onClick={() => handleDeleteCollection(collection.id)}
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
        isOpen={showForm || Boolean(editingCollection)}
        onClose={resetForm}
        title={editingCollection ? "Editar colección" : "Nueva colección"}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre de la colección"
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

          {/* CONTENEDOR IMAGEN */}
          <div className="flex items-center gap-4 flex-wrap mt-2">
            <div className="flex-shrink-0 w-[7.5rem]">
              <FileUploaderRegular
                pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
                multiple={false}
                imgOnly
                onFileUploadSuccess={handleAddImage}
                className="bg-[#4a7c9b] hover:bg-[#5f95b3] text-[#fff] px-3 py-2 rounded-lg cursor-pointer transition-colors w-full text-center"
              />
              <p className="text-gray-500 text-sm mt-1 text-center">
                {formData.image ? "1 / 1 imagen" : "0 / 1 imagen"}
              </p>
            </div>

            {formData.image && (
              <div className="relative flex-shrink-0">
                <img
                  src={formData.image}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={resetForm} className="px-4 py-2 border rounded-lg">
              Cancelar
            </button>
            <button
              onClick={editingCollection ? handleEditCollection : handleCreateCollection}
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

export default ManageCollection;
