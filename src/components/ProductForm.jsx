import React, { useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const ProductForm = ({
  initialData = null,
  categories = [],
  collections = [],
  onSubmit,
  onCancel,
}) => {
  const isEditing = Boolean(initialData);

  /* =========================
     STATE
  ========================= */
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    images: [],         // soporte para múltiples imágenes
    categoryId: 0,      // categoría
    collectionId: 0,    // colección
  });

  const [errors, setErrors] = useState({});

  /* =========================
     CARGA INICIAL (EDITAR)
  ========================= */
  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name ?? "",
        price: initialData.price ?? "",
        stock: initialData.stock ?? "",
        description: initialData.description ?? "",
        images: initialData.imageUrls ?? [],  // múltiples imágenes
        categoryId: initialData.category?.id ?? 0,
        collectionId: initialData.collection?.id ?? 0,
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
    if (!product.collectionId) newErrors.collectionId = "La colección es obligatoria";

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
            {cat.category_name ?? cat.name}
          </option>
        ))}
      </select>
      {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId}</p>}

      {/* Colección */}
      <select
        name="collectionId"
        value={product.collectionId}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value={0}>Selecciona una colección</option>
        {collections.map((col) => (
          <option key={col.id} value={col.id}>
            {col.collection_name}
          </option>
        ))}
      </select>
      {errors.collectionId && <p className="text-red-500 text-sm">{errors.collectionId}</p>}

      {/* Descripción */}
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        rows={3}
        placeholder="Descripción del producto"
        className="border p-2 rounded w-full"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

      {/* Imagenes */}
      <FileUploaderRegular
        pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
        multiple={true}
        imgOnly
        onFileUploadSuccess={handleAddImage}
      />
      <p className="text-gray-500 text-sm">{product.images.length} / 3 imágenes</p>
      {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

      {/* Preview de imágenes */}
      <div className="flex flex-wrap gap-2 mt-2">
        {product.images.map((url, i) => (
          <div key={i} className="relative">
            <img src={url} alt={`preview-${i}`} className="w-24 h-24 object-cover rounded" />
            <button
              type="button"
              onClick={() => handleRemoveImage(i)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
        ))}
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
