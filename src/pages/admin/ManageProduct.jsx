import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { capitalizeFirst } from "@/lib/helpers"
import { getBGColorTag } from "@/lib/helpers"

import ManageProductForm from "@/components/ManageProductForm";
import Modal from "@/components/reuse/Modal";

// servicios
import {
  fetchAllProducts,
  saveProduct,
  editProduct,
  deleteProduct,
} from "../../services/product.service";
import { fetchAllCategories } from "@/services/category.service";
import { fetchAllCollections } from "@/services/collection.service";

const ManageProduct = () => {
  const [products, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await fetchAllProducts();
        setProductos(productsData ?? []);

        const categoriesData = await fetchAllCategories();
        setCategories(categoriesData ?? []);

        const collectionsData = await fetchAllCollections();
        setCollections(collectionsData ?? []);
      } catch (err) {
        toast.error("Error al cargar productos, categorías o colecciones");
      }
    };
    loadData();
  }, []);

  const validateProduct = (product) => {
    if (!product.name?.trim()) return "El nombre es obligatorio";
    if (!product.description?.trim()) return "La descripción es obligatoria";
    if (!product.categoryId) return "La categoría es obligatoria";
    if (!product.price || Number(product.price) <= 0)
      return "El precio debe ser mayor a 0";
    if (product.stock != null && Number(product.stock) < 0)
      return "El stock no puede ser negativo";
    if (!product.images || product.images.length === 0)
      return "Se requiere al menos una imagen";
    return null;
  };

  const handleManageProduct = async (formData) => {
    const error = validateProduct(formData);
    if (error) return toast.error(error);

    const payload = {
      ...formData,
      name: capitalizeFirst(formData.name), // ✅ aplica tu función
      collections: selectedCollections.map((c) => ({ id: c.id })),
    };

    try {
      const created = await saveProduct(payload);
      setProductos((prev) => [created, ...prev]);
      toast.success("Producto creado correctamente");
      setShowForm(false);
      setSelectedCollections([]);
    } catch (err) {
      toast.error(err.message || "Error al crear producto");
    }
  };

  const handleEditProduct = async (formData) => {
    const error = validateProduct(formData);
    if (error) return toast.error(error);

    const payload = {
      ...formData,
      name: capitalizeFirst(formData.name), // ✅ aplica tu función
      collections: selectedCollections.map((c) => ({ id: c.id })),
    };

    try {
      const updated = await editProduct(editingProduct.id, payload);
      setProductos((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? updated : p))
      );
      toast.success("Producto actualizado");
      setEditingProduct(null);
      setShowForm(false);
      setSelectedCollections([]);
    } catch (err) {
      toast.error(err.message || "Error al actualizar producto");
    }
  };


  const handleDeleteProduct = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await deleteProduct(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      toast.success("Producto eliminado");
    } catch (err) {
      toast.error(err.message || "Error al eliminar producto");
    }
  };

  const filteredProducts = products.filter((p) => {
    const termLower = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(termLower) ||
      p.description?.toLowerCase().includes(termLower) ||
      p.category?.name?.toLowerCase().includes(termLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 lg:px-16 px-8 py-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">Gestión de Productos</h1>
        <p className="text-gray-600 mb-6">Administra tu catálogo de joyas</p>

        {/* CONTROLES */}
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
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
              setSelectedCollections([]);
            }}
            className="px-4 py-2 bg-[#5e8c77] text-white rounded-lg flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Joya
          </button>
        </div>

        {/* LISTADO */}
        <div className="flex flex-col gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow px-6 py-4 flex flex-row justify-between items-stretch"
            >
              {/* COLUMNA IZQUIERDA: Encabezado + Info + Imágenes */}
              <div className="flex flex-col gap-1 flex-1">
                {/* Encabezado: Nombre + Colecciones */}
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{product.name ?? ""}</h3>

                  {product.collections?.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-xs font-medium">
                        Colección:
                      </span>
                      {product.collections.map((col) => (
                        <span
                          key={col.id}
                          className={`${getBGColorTag(col.slug)} mr-2 inline-block rounded-md text-white text-xs px-2 py-0.5 font-semibold`}
                        >
                          {col.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info + Preview imágenes */}
                <div className="flex flex-row gap-6 items-center">
                  {/* Info del producto */}
                  <div className="flex-shrink-0 flex flex-col gap-1">
                    <p className="text-sm text-gray-500 capitalize">
                      Categoría: {product.category?.name ?? "sin categoría"}
                    </p>
                    <p className="text-sm">Descripción: {product.description ?? ""}</p>
                    <p className="font-medium">${product.price?.toLocaleString() ?? 0}</p>
                    <p className="text-xs text-gray-400">Stock: {product.stock ?? 0}</p>
                  </div>

                  {/* Preview imágenes */}
                  <div className="flex gap-2 overflow-x-auto flex-1">
                    {product.imageUrls?.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`imagen-${i}`}
                        className="w-20 h-20 object-cover rounded flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: Botones horizontales */}
              <div className="flex flex-col justify-center ml-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProduct({
                        ...product,
                        imageUrls: product.imageUrls ?? [],
                        category: product.category ?? null,
                      });
                      setSelectedCollections(
                        product.collectionIds?.length
                          ? product.collectionIds
                          : product.collections?.map((c) => ({ id: c.id, name: c.name })) || []
                      );
                      setShowForm(true);
                    }}
                    className="text-indigo-600 px-2 py-2 rounded hover:bg-gray-100 transition-colors"
                    style={{ border: "none" }}
                  >
                    <Edit className="h-4 w-4 inline-block mr-1" /> Editar
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 px-2 py-2 rounded hover:bg-gray-100 transition-colors"
                    style={{ border: "none" }}
                  >
                    <Trash2 className="h-4 w-4 inline-block mr-1" /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>


      {/* MODAL */}
      <Modal
        isOpen={showForm}gestionar producto
        onClose={() => {
          setShowForm(false);
          setEditingProduct(null);
          setSelectedCollections([]);
        }}
        title={editingProduct ? "Editar producto" : "Nuevo producto"}
      >
        <ManageProductForm
          initialData={editingProduct}
          categories={categories}
          collections={collections}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
          onSubmit={editingProduct ? handleEditProduct : handleManageProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
            setSelectedCollections([]);
          }}
        />
      </Modal>
    </div>
  );
};

export default ManageProduct;
