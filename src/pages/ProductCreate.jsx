import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import ProductForm from "@/components/ProductForm";
import Modal from "@/components/reuse/Modal";


// helpers
import { CATEGORY_RULES } from "@/lib/helpers";

// servicios
import {
  fetchAllProducts,
  saveProduct,
  editProduct,
  deleteProduct,
} from "../services/product.service";
import { fetchAllCategorys } from "@/services/category.service";
import { fetchAllCollections } from "@/services/collection.service"; // 👈 NUEVO

const ProductCreate = () => {
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [collections, setCollections] = useState([]); // 👈 NUEVO

  /* =========================
     CARGA INICIAL
  ========================= */
  useEffect(() => {
    const loadProductsAndCategories = async () => {
      try {
        // Cargar productos
        const productsData = await fetchAllProducts();
        setProductos(productsData);
        console.log("data", productsData)
        // Cargar categorías
        const categoriesData = await fetchAllCategorys();
        setCategories(categoriesData);
        // Cargar colecciones
        const collectionsData = await fetchAllCollections();
        setCollections(collectionsData); // 👈 NUEVO

      } catch (err) {
        toast.error("Error al cargar productos o categorías");
      }
    };

    loadProductsAndCategories();
  }, []);

  /* =========================
     VALIDACIONES
  ========================= */
  const validateProduct = (product) => {
    if (!product.nombre?.trim()) return "El nombre es obligatorio";
    if (!product.descripcion?.trim())
      return "La descripción es obligatoria";
    if (!product.categoria) return "La categoría es obligatoria";
    if (!product.precio || Number(product.precio) <= 0)
      return "El precio debe ser mayor a 0";
    if (product.stock == null || Number(product.stock) < 0)
      return "El stock no puede ser negativo";

    return null;
  };

  /* =========================
   CREAR
  ========================= */
  const handleProductCreate = async (productData) => {
    const error = validateProduct(productData);
    if (error) {
      toast.error(error);
      return;
    }

    const newProducto = {
      product_name: productData.nombre,
      description: productData.descripcion,
      price: Number(productData.precio),
      stock: Number(productData.stock),
      id_category: productData.categoria,
      id_collection: productData.coleccion, // 👈 NUEVO
      imageUrl: productData.imageUrl, //
    };

    console.log("imagen", productData.imageUrl)

    try {
      const productCreated = await saveProduct(newProducto);
      setProductos((prev) => [productCreated, ...prev]);
      toast.success("Producto creado correctamente");
      setShowForm(false);
    } catch (err) {
      toast.error(err.message || "Error al crear producto");
    }
  };

  /* =========================
    EDITAR
  ========================= */
  const handleEditProduct = async (productData) => {
    const error = validateProduct(productData);
    if (error) {
      toast.error(error);
      return;
    }

    const payload = {
      product_name: productData.nombre,
      description: productData.descripcion,
      price: Number(productData.precio),
      id_category: productData.categoria,
      id_collection: productData.coleccion, // 👈 NUEVO
      imageUrl: productData.imageUrl, // ← agregamos imageUrl
    };

    if (productData.stock !== undefined && productData.stock !== "") {
      payload.stock = Number(productData.stock);
    }

    try {
      const updated = await editProduct(editingProduct.id_product, payload);

      console.log("UPDATED FROM BACKEND:", updated);// PRUEBA

      if (!updated) {
        // 👇 fallback: volver a pedir todos
        const productsData = await fetchAllProducts();
        setProductos(productsData);
      } else {
        setProductos((prev) =>
          prev.map((p) =>
            p.id_product === editingProduct.id_product ? updated : p
          )
        );
      } // PRUEBA

      toast.success("Producto actualizado");
      setEditingProduct(null);
    } catch (err) {
      toast.error(err.message || "Error al actualizar producto");
    }
  };

  /* =========================
     ELIMINAR
  ========================= */
  const handleDeleteProduct = async (idProduct) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await deleteProduct(idProduct);

      setProductos((prev) =>
        prev.filter((p) => p.id_product !== idProduct)
      );

      toast.success("Producto eliminado");
    } catch (err) {
      toast.error(err.message || "Error al eliminar producto");
    }
  };

  /* =========================
     BUSCADOR
  ========================= */
  const term = searchTerm.toLowerCase();

  const filteredProducts = productos.filter((p) => {
    const categoryLabel =
      CATEGORY_RULES[p.id_category]?.toLowerCase() || "";

    return (
      p.product_name?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term) ||
      categoryLabel.includes(term)
    );
  });

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Gestión de Productos
        </h1>
        <p className="text-gray-600 mb-6">
          Administra tu catálogo de joyas
        </p>

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
        <div className="grid gap-4">
          {filteredProducts.map((producto) => (
            <div
              key={producto.id_product}
              className="bg-white rounded-xl shadow p-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">
                  {producto.product_name}
                </h3>

                <p className="text-sm text-gray-500 capitalize">
                  Categoría:{" "}
                  {categories.find(cat => cat.id_category === producto.id_category)?.category_name
                    ?? "sin categoría"}
                </p>

                <p className="text-sm text-gray-500">
                  Colección:{" "}
                  {collections.find(c => c.id_collection === producto.id_collection)
                    ?.collection_name ?? "sin colección"}
                </p>

                <p className="text-sm">
                  {producto.description}
                </p>

                <p className="font-medium">
                  ${producto.price.toLocaleString()}
                </p>

                <p className="text-xs text-gray-400">
                  Stock: {producto.stock}
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
                  onClick={() =>
                    handleDeleteProduct(producto.id_product)
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
        isOpen={showForm || Boolean(editingProduct)}
        onClose={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? "Editar producto" : "Nuevo producto"}
      >
        <ProductForm
          initialData={editingProduct}
          categories={categories} // ✅ nueva prop
          collections={collections} // 👈 NUEVO
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
