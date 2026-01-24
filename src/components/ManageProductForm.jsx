import React, { useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
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
  // MANEJO DE INPUTS
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

  const handleAddImage = (file) => {
    if (product.images.length >= 3)
      return alert("Solo se permiten hasta 3 imágenes por producto");
    setProduct((prev) => ({ ...prev, images: [...prev.images, file.cdnUrl] }));
  };

  const handleRemoveImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...product,
      collections: selectedCollections?.map((c) => ({ id: c.id })) ?? [],
    };

    onSubmit(payload);
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
          placeholder="Nombre del producto"
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
          placeholder="Precio"
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
          placeholder="Stock"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Categoría */}
      <div className="flex flex-col gap-1">
        {/* <label className="font-medium text-gray-700">Categoría</label> */}
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
      </div>

      {/* Colecciones */}
      <div className="flex flex-col gap-1">
        {/* <label className="font-medium text-gray-700">Colecciones</label> */}
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
          className="border p-2 rounded w-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5e8c77] focus:border-[#5e8c77]"
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

        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCollections.map((col, i) => (
            <div key={i} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1">
              <span>{col.name}</span>
              <button
                type="button"
                onClick={() =>
                  setSelectedCollections(selectedCollections.filter((_, idx) => idx !== i))
                }
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Descripción</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          rows={3}
          placeholder="Descripción del producto"
          className="border p-2 rounded w-full resize-none overflow-auto"
        />
      </div>

      {/* Imágenes */}
      <div className="border border-gray-200 rounded-lg p-4 mt-6 bg-white">
        <h3 className="font-medium mb-2">Imágenes del producto</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-shrink-0 w-[7.5rem]">
            <FileUploaderRegular
              pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
              multiple
              imgOnly
              onFileUploadSuccess={handleAddImage}
              className="bg-[#4a7c9b] hover:bg-[#5f95b3] text-[#fff] px-3 py-2 rounded-lg cursor-pointer transition-colors w-full text-center"
            />
            <p className="text-gray-500 text-sm mt-1 text-center">
              {product.images.length} / 3 imágenes
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto flex-1">
            {product.images.map((url, i) => (
              <div key={i} className="relative flex-shrink-0">
                <img src={url} alt={`preview-${i}`} className="w-24 h-24 object-cover rounded" />
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

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">
          Cancelar
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-[#5e8c77] text-white rounded"
        >
          {isEditing ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </form>
  );
};

export default ManageProductForm;
