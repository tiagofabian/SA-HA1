import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Modal from "@/components/reuse/Modal";
import { capitalizeFirst } from "@lib/helpers"

import {
  fetchAllCollections,
  saveCollection,
  editCollection,
  deleteCollection,
} from "@/services/collection.service";

const CollectionCreate = () => {
  const [colecciones, setColecciones] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  /* =========================
     CARGA INICIAL
  ========================= */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCollections();
        setColecciones(data);
      } catch (err) {
        toast.error("Error al cargar coleccións");
      }
    };

    loadCategories();
  }, []);

  /* =========================
     VALIDACIÓN
  ========================= */
  const validateCollection = () => {
    if (!formData.name.trim()) {
      return "El nombre es obligatorio";
    }
    return null;
  };

  /* =========================
     CREAR
  ========================= */
  const handleCreateCollection = async () => {
    const error = validateCollection();
    if (error) {
      toast.error(error);
      return;
    }

    // Normalizar el nombre de la colección
    const normalizedCollectionName = capitalizeFirst(formData.name);

    const payload = {
      ...formData,
      name: normalizedCollectionName,
    };

    try {
      const created = await saveCollection(payload);

      // Actualizar estado de coleccións
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
    if (error) {
      toast.error(error);
      return;
    }

    const payload = {
      ...formData,
      name: capitalizeFirst(formData.name),
    };

    try {
      const updated = await editCollection(editingCollection.id, payload);
      console.log("aquiiii",editingCollection.id);

      /* setColecciones((prev) =>
        prev.map((c) =>
          c.id === editingCollection.id ? updated : c
        )
      ); */

      setColecciones((prev) =>
        prev.map((c) =>
          c.id === editingCollection.id
            ? { ...c, ...updated }
            : c
        )
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

      setColecciones((prev) =>
        prev.filter((c) => c.id !== idCollection)
      );

      toast.success("Colección eliminada");
    } catch (err) {
      toast.error(err.message || "Error al eliminar colección");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setEditingCollection(null);
    setShowForm(false);
  };

  /* =========================
     BUSCADOR
  ========================= */
  const term = searchTerm.toLowerCase();

  const filteredCategories = colecciones.filter(
    (c) =>
      c.name.toLowerCase().includes(term) ||
      (c.description ?? "").toLowerCase().includes(term)
  );

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          📂 Gestión de Colecciones
        </h1>
        <p className="text-gray-600 mb-6">
          Administra las coleccións de tus productos
        </p>

        {/* CONTROLES */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
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
            <Plus className="h-4 w-4 mr-2" />
            Nueva Colección
          </button>
        </div>

        {/* LISTADO */}
        <div className="grid gap-4">
          {filteredCategories.map((collection) => (
            <div
              key={collection.id}
              className="bg-white rounded-xl shadow p-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">
                  {collection.name}
                </h3>
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
                    });
                  }}
                  className="text-indigo-600 flex items-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </button>

                <button
                  onClick={() =>
                    handleDeleteCollection(collection.id)
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
        isOpen={showForm || Boolean(editingCollection)}
        onClose={resetForm}
        title={
          editingCollection ? "Editar colección" : "Nueva colección"
        }
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre de la colección"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
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
                editingCollection
                  ? handleEditCollection
                  : handleCreateCollection
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

export default CollectionCreate;
