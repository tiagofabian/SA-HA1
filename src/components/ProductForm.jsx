import React, { useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const ProductForm = ({ initialData = null, categories = [], collections = [], onSubmit, onCancel }) => {
  const isEditing = Boolean(initialData);

  /* =========================
     STATE
  ========================= */
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    categoryId: 0,
    collectionIds: [],   // ahora soporta múltiples colecciones
    images: [],          // soporte para múltiples imágenes
  });

  const [errors, setErrors] = useState({});

  /* =========================
     CARGA INICIAL (EDITAR)
  ========================= */
  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name ?? initialData.product_name ?? "",
        price: initialData.price ?? 0,
        stock: initialData.stock ?? 0,
        description: initialData.description ?? "",
        categoryId: initialData.category?.id ?? 0,
        collectionIds: initialData.collections?.map(c => c.id) ?? [],
        images: initialData.imageUrls ?? [],
      });
    }
  }, [initialData]);


  /* =========================
     MANEJO DE INPUTS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "categoryId" || name === "collectionId" ? Number(value) : value,
    }));
  };

  /* =========================
     AGREGAR IMÁGENES (máx 3)
  ========================= */
  const handleAddImage = (file) => {
    if (product.images.length >= 3) {
      alert("Solo se permiten hasta 3 imágenes por producto");
      return;
    }
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, file.cdnUrl],
    }));
  };

  /* =========================
     REMOVER IMAGEN
  ========================= */
  const handleRemoveImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!product.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!product.description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!product.price || Number(product.price) <= 0) newErrors.price = "El precio debe ser mayor a 0";
    if (product.stock !== "" && Number(product.stock) < 0) newErrors.stock = "El stock no puede ser negativo";
    if (!product.categoryId) newErrors.categoryId = "La categoría es obligatoria";

    if (!product.images || product.images.length === 0) newErrors.images = "Se requiere al menos una imagen";
    if (product.images.length > 3) newErrors.images = "No se pueden subir más de 3 imágenes";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(product);
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre */}
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Nombre del producto"
        className="border p-2 rounded w-full"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      {/* Precio */}
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Precio"
        className="border p-2 rounded w-full"
      />
      {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

      {/* Stock */}
      <input
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="border p-2 rounded w-full"
      />
      {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}

      {/* Categoría */}
      <select
        name="categoryId"
        value={product.categoryId}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value={0}>Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Colección */}
      <div className="flex flex-wrap gap-2">
        {collections.map(col => (
          <label key={col.id} className="flex items-center gap-1">
            <input
              type="checkbox"
              value={col.id}
              checked={product.collectionIds.includes(col.id)}
              onChange={(e) => {
                const val = Number(e.target.value);
                setProduct(prev => ({
                  ...prev,
                  collectionIds: prev.collectionIds.includes(val)
                    ? prev.collectionIds.filter(id => id !== val)
                    : [...prev.collectionIds, val]
                }));
              }}
            />
            {col.name}
          </label>
        ))}
      </div>
      {errors.collectionId && <p className="text-red-500 text-sm">{errors.collectionId}</p>}

      {/* Descripción */}
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        rows={3}
        placeholder="Descripción del producto"
        className="border p-2 rounded w-full resize-none overflow-auto"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

      {/* Contenedor principal de imágenes */}
      <div className="border border-gray-200 rounded-lg p-4 mt-6 bg-white">
        <h3 className="font-medium mb-2">Imágenes del producto</h3>

        {/* Contenedor flex para botón y previews */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Botón de subida */}
          <div className="flex-shrink-0 w-[7.5rem]">
            <FileUploaderRegular
              pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
              multiple={true}
              imgOnly
              onFileUploadSuccess={handleAddImage}
              className="bg-[#4a7c9b] hover:bg-[#5f95b3] text-[#fff] px-3 py-2 rounded-lg cursor-pointer transition-colors w-full text-center"
            />
            <p className="text-gray-500 text-sm mt-1 text-center">
              {product.images.length} / 3 imágenes
            </p>
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
          </div>

          {/* Previews horizontales */}
          <div className="flex gap-2 overflow-x-auto flex-1">
            {product.images.map((url, i) => (
              <div key={i} className="relative flex-shrink-0">
                <img
                  src={url}
                  alt={`preview-${i}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Acciones */}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Cancelar</button>
        <button type="submit" className="px-3 py-1 bg-[#5e8c77] text-white rounded">
          {isEditing ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
