import React, { useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import { ReactSortable } from "react-sortablejs";
import "@uploadcare/react-uploader/core.css";

const ManageProductForm = ({
  initialData = null,
  categories = [],
  collections = [],
  selectedCollections,
  setSelectedCollections,
  onSubmit,
  onCancel,
}) => {
  const isEditing = Boolean(initialData);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    categoryId: 0,
    images: [],
  });

  // =========================
  // PRE-CARGA AL EDITAR
  // =========================
  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name ?? "",
        price: initialData.price ?? 0,
        stock: initialData.stock ?? 0,
        description: initialData.description ?? "",
        categoryId: initialData.category?.id ?? 0,
        images: initialData.imageUrls ?? [],
      });

      if (initialData.collections?.length) {
        setSelectedCollections(
          initialData.collectionIds?.length
            ? initialData.collectionIds
            : initialData.collections.map((c) => ({ id: c.id, name: c.name }))
        );
      }
    } else {
      setProduct({
        name: "",
        price: "",
        stock: "",
        description: "",
        categoryId: 0,
        images: [],
      });
      setSelectedCollections([]);
    }
  }, [initialData, setSelectedCollections]);

  // =========================
  // INPUTS
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "categoryId"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  // =========================
  // IMÁGENES
  // =========================
  const handleAddImage = (file) => {
    if (!file?.cdnUrl) {
      alert("Error al subir la imagen");
      return;
    }

    if (product.images.length >= 3) {
      alert("Solo se permiten hasta 3 imágenes por producto");
      return;
    }

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, file.cdnUrl],
    }));
  };

  const handleRemoveImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.name?.trim()) return alert("El nombre es obligatorio");
    if (!product.price || Number(product.price) <= 0) return alert("El precio debe ser mayor a 0");
    if (!product.categoryId) return alert("La categoría es obligatoria");
    if (!product.images || product.images.length === 0) return alert("Se requiere al menos una imagen");

    const payload = {
      ...product,
      images: product.images, // Mantiene el orden para el backend
      collections: selectedCollections?.map((c) => ({ id: c.id })) ?? [],
    };

    try {
      onSubmit(payload);
    } catch (err) {
      alert("Error al guardar el producto: " + err.message);
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Precio */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Precio</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Stock */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Stock</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

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

      {/* Colecciones */}
      <select
        value=""
        onChange={(e) => {
          const selectedId = Number(e.target.value);
          if (!selectedId) return;

          const col = collections.find((c) => c.id === selectedId);
          if (!col) return;

          if (selectedCollections.some((c) => c.id === col.id)) return;

          setSelectedCollections([...selectedCollections, { id: col.id, name: col.name }]);
          e.target.value = "";
        }}
        className="border p-2 rounded w-full"
      >
        <option value="">Selecciona una colección</option>
        {collections.map((col) => (
          <option
            key={col.id}
            value={col.id}
            disabled={selectedCollections.some((c) => c.id === col.id)}
          >
            {col.name}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2">
        {selectedCollections.map((col, i) => (
          <span
            key={i}
            className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
          >
            {col.name}
            <button
              type="button"
              onClick={() =>
                setSelectedCollections(selectedCollections.filter((_, idx) => idx !== i))
              }
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Descripción */}
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        rows={3}
        className="border p-2 rounded w-full resize-none"
      />

      {/* IMÁGENES */}
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="font-medium mb-2">Imágenes del producto</h3>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-[7.5rem]">
            <FileUploaderRegular
              pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
              multiple
              imgOnly
              onFileUploadSuccess={handleAddImage}
              className="bg-[#4a7c9b] hover:bg-[#5f95b3] text-white px-3 py-2 rounded-lg w-full text-center"
            />
            <p className="text-sm text-gray-500 text-center mt-1">
              {product.images.length} / 3
            </p>
          </div>

          <ReactSortable
            list={product.images}
            setList={(newOrder) =>
              setProduct((prev) => ({ ...prev, images: newOrder }))
            }
            className="flex gap-2 overflow-x-auto flex-1"
            animation={200}
            direction="horizontal"
          >
            {product.images.map((url, i) => (
              <div
                key={url}
                className="relative flex-shrink-0 cursor-grab active:cursor-grabbing"
              >
                <img
                  src={url}
                  alt={`preview-${i}`}
                  className="w-24 h-24 object-cover rounded border"
                />

                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
                  {i + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="border px-3 py-1 rounded">
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-[#5e8c77] text-white px-3 py-1 rounded"
        >
          {isEditing ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </form>
  );
};

export default ManageProductForm;