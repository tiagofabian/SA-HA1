import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import ProductForm from "@/components/ProductForm";
import Modal from "@/components/reuse/Modal";

// servicios
import {
  fetchAllProducts,
  saveProduct,
  editProduct,
  deleteProduct,
} from "../services/product.service";
import { fetchAllCategories } from "@/services/category.service";
import { fetchAllCollections } from "@/services/collection.service";

const ProductCreate = () => {
  const [products, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // =========================
  // CARGA INICIAL
  // =========================
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
        toast.error("Error al cargar products, categorías o colecciones");
      }
    };

    loadData();
  }, []);

  // =========================
  // VALIDACIONES
  // =========================
  const validateProduct = (product) => {
    if (!product.name?.trim()) return "El nombre es obligatorio";
    if (!product.description?.trim()) return "La descripción es obligatoria";
    if (!product.categoryId) return "La categoría es obligatoria";
    if (!product.price || Number(product.price) <= 0) return "El precio debe ser mayor a 0";
    if (product.stock != null && Number(product.stock) < 0) return "El stock no puede ser negativo";
    if (!product.images || product.images.length === 0) return "Se requiere al menos una imagen";

    return null;
  };

  // =========================
  // CREAR PRODUCTO
  // =========================
  const handleProductCreate = async (productData) => {
    const error = validateProduct(productData);
    if (error) return toast.error(error);

    const newProduct = {
      name: productData.name,
      description: productData.description ?? "",
      price: Number(productData.price),
      stock: productData.stock != null ? Number(productData.stock) : null,
      categoryId: Number(productData.categoryId),
      collections: productData.collectionIds
        ? productData.collectionIds.map(Number)
        : [],
      images: productData.images ?? [],
    };

    try {
      const created = await saveProduct(newProduct);
      setProductos((prev) => [created, ...prev]);
      toast.success("Producto creado correctamente");
      setShowForm(false);
    } catch (err) {
      toast.error(err.message || "Error al crear product");
    }
  };

  // =========================
  // EDITAR PRODUCTO
  // =========================
  const handleEditProduct = async (productData) => {
    const error = validateProduct(productData);
    if (error) return toast.error(error);

    const payload = {
      name: productData.name,
      description: productData.description ?? "",
      price: Number(productData.price),
      stock: productData.stock != null ? Number(productData.stock) : null,
      categoryId: Number(productData.categoryId),  // categoría como número
      collections: productData.collectionIds?.length
        ? productData.collectionIds.map(c => ({ id: c.id })) // SOLO id
        : [],
      images: productData.images ?? [],
    };

    console.log("dataProduct listo para enviar:", payload);

    try {
      const updated = await editProduct(editingProduct.id, payload);

      setProductos((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...updated } : p
        )
      );

      toast.success("Producto actualizado");
      setEditingProduct(null);
      setShowForm(false);
    } catch (err) {
      toast.error(err.message || "Error al actualizar product");
    }
  };




  // =========================
  // ELIMINAR PRODUCTO
  // =========================
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este product?")) return;

    try {
      await deleteProduct(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      toast.success("Producto eliminado");
    } catch (err) {
      toast.error(err.message || "Error al eliminar product");
    }
  };

  // =========================
  // FILTRO DE BÚSQUEDA
  // =========================
  const filteredProducts = products.filter((p) => {
    const termLower = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(termLower) ||
      p.description?.toLowerCase().includes(termLower) ||
      p.category?.name?.toLowerCase().includes(termLower)
    );
  });

  // =========================
  // RENDER
  // =========================
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
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
            onClick={() => setShowForm(true)}
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
              className="bg-white rounded-xl shadow py-4 px-6 flex justify-between items-center"
            >
              <div className="flex flex-auto gap-8 items-center">
                <div className="flex-shrink-0 w-auto">
                  <h3 className="font-semibold">{product.name ?? ""}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    Categoría: {product.category?.name ?? "sin categoría"}
                  </p>
                  <p className="text-sm">Descripción: {product.description ?? ""}</p>
                  <p className="font-medium">${product.price?.toLocaleString() ?? 0}</p>
                  <p className="text-xs text-gray-400">Stock: {product.stock ?? 0}</p>
                </div>

                <div className="flex gap-2 overflow-x-auto flex-shrink-0">
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

              <div className="flex flex-row gap-6 flex-shrink-0 w-[120px] justify-end">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setShowForm(true);
                  }}
                  className="text-indigo-600 flex items-center justify-center w-full"
                >
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-600 flex items-center justify-center w-full"
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
        isOpen={showForm || Boolean(editingProduct)}
        onClose={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? "Editar product" : "Nuevo product"}
      >
        <ProductForm
          initialData={editingProduct}
          categories={categories}
          collections={collections}
          onSubmit={editingProduct ? handleEditProduct : handleProductCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default ProductCreate;
